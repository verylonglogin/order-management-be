import {ConflictException, Injectable} from '@nestjs/common'
import {Repository} from "typeorm"
import {InjectRepository} from "@nestjs/typeorm"
import {CreateOrderDto} from "../dto/create.order.dto"
import {mapCreateOrderDtoToEntity, mapOrderEntityToDto} from "../utils/order.mapper"
import {Order} from "../entities/order.entity"
import {OrdersResponseDto} from "../dto/orders.response.dto";

@Injectable()
export class OrderService {
    UNIQUE_CONSTRAINT_VIOLATION = '23505'

    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,) {
    }

    async findAll(
        page: number = 0,
        size: number = 10,
        country?: string,
        paymentDescription?: string
    ): Promise<OrdersResponseDto> {
        const queryBuilder = this.orderRepository.createQueryBuilder("orders");

        if (country) {
            queryBuilder.andWhere("orders.country ILIKE :country", {
                    country: `${country.toLowerCase()}%`
                }
            );
        }
        if (paymentDescription) {
            queryBuilder.andWhere("orders.payment_description_tsv @@ websearch_to_tsquery('english', :query)", {
                query: paymentDescription.replace(/\s+/g, " & "),
            })
        }
        queryBuilder.addOrderBy("(CASE WHEN orders.country = 'Estonia' THEN 1 ELSE 2 END)", "ASC");
        queryBuilder.addOrderBy("orders.payment_due_date", "ASC");

        const [orders, totalItems] = await queryBuilder
            .skip(page * size)
            .take(size)
            .getManyAndCount();

        return {
            orders: orders.map(o => mapOrderEntityToDto(o)),
            totalItems,
        }
    }

    // They're 48^5 = 254803968 (approximately 255 million) unique values
    async generateOrderId() {
        const { customAlphabet } = await import('nanoid');
        const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz", 5);
        return nanoid(); // Generates a unique 5-character ID
    }

    async create(dto: CreateOrderDto) {
        let attempt = 0;
        const maxRetries = 5;
        let order = mapCreateOrderDtoToEntity(dto)
        while (attempt < maxRetries) {
            try {
                order.id = await this.generateOrderId();
                return await this.orderRepository.insert(order);
            } catch (error) {
                if (error.code === this.UNIQUE_CONSTRAINT_VIOLATION && error.message.includes('violates unique constraint "PK_')) {
                    attempt++;
                    console.log(`Retry attempt ${attempt} due to duplicate order.id violation.`);
                    continue;
                } else if (error.code === this.UNIQUE_CONSTRAINT_VIOLATION) {
                    throw new ConflictException('Order with this number already exists')
                }

                throw error;
            }
        }

        throw new ConflictException('Failed to create order after multiple attempts due to duplicate order.id violation');
    }

}

