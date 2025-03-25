import {Module} from '@nestjs/common';
import {OrderService} from './services/order.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {pgConfig} from "./config/db.config";
import {OrderController} from "./controllers/order.controller";
import {Order} from "./entities/order.entity";
import {HealthController} from "./controllers/health.controller";

@Module({
    imports: [
        TypeOrmModule,
        TypeOrmModule.forRoot(pgConfig()),
        TypeOrmModule.forFeature([Order]),
    ],

    controllers: [OrderController, HealthController],
    providers: [OrderService],
})

export class AppModule {

}
