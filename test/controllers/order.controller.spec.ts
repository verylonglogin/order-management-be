import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import {OrderController} from "../../src/controllers/order.controller";
import {OrderService} from "../../src/services/order.service";
import {CreateOrderDto} from "../../src/dto/create.order.dto";

describe('OrderController', () => {
    let controller: OrderController;
    let mockOrderService: { create: jest.Mock };

    beforeEach(async () => {
        mockOrderService = {
            create: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [
                { provide: OrderService, useValue: mockOrderService },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController) as OrderController;

    });

    it('should return 201 and success message on successful creation', async () => {
        const dto: CreateOrderDto = {
            orderNumber: 12345,
            paymentDescription: 'Payment for Order #12345',
            streetAddress: '123 Main Street',
            town: 'Springfield',
            country: 'USA',
            amount: 250.75,
            currency: 'USD',
            paymentDueDate: '2025-04-15',
        };

        mockOrderService.create.mockResolvedValue(undefined);

        const result = await controller.create(dto);

        expect(result).toEqual({
            statusCode: 201,
            message: 'Order created successfully',
        });
        expect(mockOrderService.create).toHaveBeenCalledWith(dto);
    });

    it('should re-throw ConflictException if thrown by service', async () => {
        const dto: CreateOrderDto = {
            orderNumber: 12345,
            paymentDescription: 'Payment for Order #12345',
            streetAddress: '123 Main Street',
            town: 'Springfield',
            country: 'USA',
            amount: 250.75,
            currency: 'USD',
            paymentDueDate: '2025-04-15',
        };

        const conflictError = new ConflictException('Duplicate order');
        mockOrderService.create.mockRejectedValue(conflictError);

        await expect(controller.create(dto)).rejects.toThrow(ConflictException);
    });

    it('should throw HttpException on unexpected error', async () => {
        const dto: CreateOrderDto = {
            orderNumber: 12345,
            paymentDescription: 'Payment for Order #12345',
            streetAddress: '123 Main Street',
            town: 'Springfield',
            country: 'USA',
            amount: 250.75,
            currency: 'USD',
            paymentDueDate: '2025-04-15',
        };

        const unexpectedError = new Error('DB failure');
        mockOrderService.create.mockRejectedValue(unexpectedError);

        await expect(controller.create(dto)).rejects.toThrow(HttpException);

        try {
            await controller.create(dto);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            expect(error.message).toBe('Something went wrong while creating the order');
        }
    });
});
