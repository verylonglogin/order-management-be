import {Module} from '@nestjs/common';
import {OrderService} from './order/order.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {pgConfig} from "./config/dbConfig";
import {Order} from "./entities/order.entity";
import {OrderController} from "./controllers/order.controller";

@Module({
    imports: [
        TypeOrmModule,
        TypeOrmModule.forRoot(pgConfig),
        TypeOrmModule.forFeature([Order]),
    ],

    controllers: [OrderController],
    providers: [OrderService],
})
export class AppModule {
}
