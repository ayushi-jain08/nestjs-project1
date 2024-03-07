import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product-dto';
import { OrderService } from 'src/order/order.service';
import { CreateOrderDto } from 'src/order/dto/order-dto';
import { AuthGuards } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
    constructor(private ProductService: ProductService, private readonly orderService: OrderService) { }

    @Post()
    createProduct(@Body() CreateProductDto: CreateProductDto) {
        return this.ProductService.createProduct(CreateProductDto);
    }

    @UseGuards(AuthGuards)
    @Post('buy')
    async buyProduct(@Body() CreateOrderDto: CreateOrderDto): Promise<string> {
        const order = await this.orderService.createOrder(CreateOrderDto);
        // Add logic for successful order response or redirection
        return 'Order placed successfully';
    }
}
