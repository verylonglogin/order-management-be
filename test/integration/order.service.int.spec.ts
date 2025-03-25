import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';

import {PostgreSqlContainer, StartedPostgreSqlContainer} from '@testcontainers/postgresql';
import {DataSource} from 'typeorm';
import {OrderService} from "../../src/services/order.service";
import {Order} from "../../src/entities/order.entity";
import {CreateOrderDto} from "../../src/dto/create.order.dto";

jest.setTimeout(30000);

describe('OrderService (e2e)', () => {
    let container: StartedPostgreSqlContainer;
    let moduleRef: TestingModule;
    let orderService: OrderService;
    let dataSource: DataSource;


    beforeAll(async () => {
        container = await new PostgreSqlContainer().start();

        moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRootAsync({
                    imports: [],
                    useFactory: () => ({
                        type: 'postgres',
                        host: container.getHost(),
                        port: container.getPort(),
                        username: container.getUsername(),
                        password: container.getPassword(),
                        database: container.getDatabase(),
                        entities: [Order],
                        synchronize: true,
                    }),
                    inject: [],
                }),
                TypeOrmModule.forFeature([Order]),
            ],
            providers: [OrderService],
        }).compile();

        orderService = moduleRef.get(OrderService);
        dataSource = moduleRef.get(DataSource);
    });

    afterEach(async () => {
        await dataSource.query('TRUNCATE TABLE "orders" ;');
    });

    afterAll(async () => {
        await dataSource.destroy();
        await container.stop();
    });

    describe('create', () => {
        it('should create a new order successfully', async () => {
            const dto: CreateOrderDto = {
                orderNumber: 1002,
                paymentDescription: 'Integration test order',
                streetAddress: 'Integration 1',
                town: 'Tallinn',
                country: 'Estonia',
                amount: 99.99,
                currency: 'EUR',
                paymentDueDate: '2025-05-01',
            };

            const result = await orderService.create(dto);
            expect(result).toBeDefined();
        });

        it('should throw ConflictException for duplicate orderNumber', async () => {
            const dto: CreateOrderDto = {
                orderNumber: 1002,
                paymentDescription: 'Integration test Duplicate order',
                streetAddress: 'Integration 1',
                town: 'Tallinn',
                country: 'Estonia',
                amount: 99.99,
                currency: 'EUR',
                paymentDueDate: '2025-05-01',
            };

            await orderService.create(dto);
            await expect(orderService.create(dto)).rejects.toMatchObject({
                response: {
                    code: 'ORDER_NUMBER_EXISTS',
                },
            });
        });
    });

    describe('findAll', () => {
        it('should return paginated orders', async () => {
            const dto1: CreateOrderDto = {
                orderNumber: 1002,
                paymentDescription: 'Integration test order',
                streetAddress: 'Integration 1',
                town: 'Tallinn',
                country: 'Estonia',
                amount: 99.99,
                currency: 'EUR',
                paymentDueDate: '2025-01-01',
            };

            const dto2: CreateOrderDto = {
                orderNumber: 1003,
                paymentDescription: 'Integration test order',
                streetAddress: 'Integration 1',
                town: 'Riga',
                country: 'Latvia',
                amount: 99.99,
                currency: 'EUR',
                paymentDueDate: '2025-02-01',
            };

            await orderService.create(dto1);
            await orderService.create(dto2);

            const response = await orderService.findAll(0, 10);
            expect(response.totalItems).toBeGreaterThanOrEqual(2);
            expect(response.orders[0].country).toBe('Estonia');
        });

        it('should filter by country', async () => {
            await orderService.create({
                orderNumber: 2000,
                paymentDescription: 'Integration test',
                streetAddress: 'Street 1',
                town: 'Tallinn',
                country: 'Estonia',
                amount: 50,
                currency: 'EUR',
                paymentDueDate: '2025-05-01',
            });
            const response = await orderService.findAll(0, 10, 'est');
            expect(response.orders.length).toBeGreaterThan(0);
            expect(response.orders[0].country.toLowerCase()).toContain('est');
        });

        it('should filter by paymentDescription', async () => {
            await orderService.create({
                orderNumber: 2001,
                paymentDescription: 'My test payment description',
                streetAddress: 'Street 2',
                town: 'Riga',
                country: 'Latvia',
                amount: 75,
                currency: 'EUR',
                paymentDueDate: '2025-06-01',
            });
            const response = await orderService.findAll(0, 10, undefined, 'test');
            expect(response.orders.length).toBeGreaterThan(0);
        });
    });
});
