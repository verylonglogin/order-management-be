import {Body, ConflictException, Controller, Get, HttpException, HttpStatus, Post, Query} from "@nestjs/common";

import {OrderService} from "../services/order.service";
import {CreateOrderDto} from "../dto/create.order.dto";
import {OrdersResponseDto} from "../dto/orders.response.dto";


@Controller('/api/orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Get()
    async getOrders(
        @Query('page') page?: number,
        @Query('size') size?: number,
        @Query('country') country?: string,
        @Query('paymentDescription') paymentDescription?: string
    ): Promise<OrdersResponseDto> {
        return this.orderService.findAll(page, size, country, paymentDescription);
    }

    @Post()
    async create(@Body() dto: CreateOrderDto) {
        try {
            await this.orderService.create(dto);
            return { statusCode: 201, message: "Order created successfully" };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            console.error('Unexpected error creating order:', error);
            throw new HttpException('Something went wrong while creating the order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
