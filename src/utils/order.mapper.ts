import {CreateOrderDto} from "../dto/create.order.dto";
import {Order} from "../entities/order.entity";
import {OrderDto} from "../dto/order.dto";


export function mapCreateOrderDtoToEntity(dto: CreateOrderDto): Order {
    const order = new Order();
    order.order_number = dto.orderNumber;
    order.payment_description = dto.paymentDescription;
    order.street_address = dto.streetAddress;
    order.town = dto.town;
    order.country = dto.country;
    order.amount = dto.amount.toString();
    order.currency = dto.currency;
    order.payment_due_date = new Date(dto.paymentDueDate);

    return order;
}

export function mapOrderEntityToDto(order: Order): OrderDto {
    const orderDto = new OrderDto();
    orderDto.orderNumber = order.order_number;
    orderDto.paymentDescription = order.payment_description;
    orderDto.streetAddress = order.street_address;
    orderDto.town = order.town;
    orderDto.country = order.country;
    orderDto.amount = Number(order.amount);
    orderDto.currency = order.currency;
    orderDto.paymentDueDate = order.payment_due_date.toString();

    return orderDto;
}
