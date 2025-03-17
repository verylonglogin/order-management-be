import {OrderDto} from "./order.dto";

export interface OrdersResponseDto {
    orders: OrderDto[];
    totalItems: number;
}