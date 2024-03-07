import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './product-schema';
import { ProductService } from './product.service';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), OrderModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
