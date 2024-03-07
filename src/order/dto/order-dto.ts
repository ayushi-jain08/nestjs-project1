import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
