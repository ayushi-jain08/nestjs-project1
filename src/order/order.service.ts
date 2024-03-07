import { UserService } from 'src/user/user.service';
import { RabbitMqserviceService } from './../rabbit-mqservice/rabbit-mqservice.service';
import { CreateOrderDto } from './dto/order-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order-schema'

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>, private rabbitMqserviceService: RabbitMqserviceService, private userService: UserService) { }


    async createOrder(CreateOrderDto: CreateOrderDto): Promise<Order> {
        const user = await this.userService.findById(CreateOrderDto.userId);
        const newOrder = new this.orderModel(CreateOrderDto);
        // Notify RabbitMQ for email notification
        await this.rabbitMqserviceService.sendOrderEmailNotification(
            user.email,
            CreateOrderDto.productId, // replace with the field that stores product name in createOrderDto
        );
        return newOrder.save();
    }

}
