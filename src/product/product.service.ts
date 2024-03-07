import { Injectable } from '@nestjs/common';
import { Product } from './product-schema';
import { CreateProductDto } from './dto/product-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    async createProduct(CreateProductDto: CreateProductDto) {
        const newProduct = new this.productModel(CreateProductDto);
        return await newProduct.save();
    }
}
