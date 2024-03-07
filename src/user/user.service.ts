import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(CreateUserDto: CreateUserDto) {
        const existingUser = await this.userModel.findOne({ email: CreateUserDto.email });
        if (existingUser) {
            throw new UnauthorizedException('User with this email already exists');
        }
        const hashPassword = await bcrypt.hash(CreateUserDto.password, 10);
        const newUser = new this.userModel({ ...CreateUserDto, password: hashPassword });
        return await newUser.save();
    }
    async findByEmail(email: string) {
        return await this.userModel.findOne({ email })
    }
    async findById(userId: string): Promise<User | null> {
        return await this.userModel.findById(userId).exec();
    }
}
