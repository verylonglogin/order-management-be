import {IsPositive, IsString, Length} from 'class-validator'

export class CreateOrderDto {
    @IsPositive()
    orderNumber: number;
    @IsString()
    @Length(1, 500, {message: 'error in length'})
    paymentDescription: string;
    streetAddress: string;
    town: string;
    country: string;
    @IsPositive()
    amount: number;
    currency: string;
    paymentDueDate: string;
}