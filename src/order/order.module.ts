import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { OrderSchema } from './order-schema';
import { OrderService } from './order.service';
import { RabbitMqserviceModule } from 'src/rabbit-mqservice/rabbit-mqservice.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]), RabbitMqserviceModule, UserModule],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrderModule { }
