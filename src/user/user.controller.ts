import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) { }

    @Post('/register')
    store(@Body() CreateUserDto: CreateUserDto): any {
        return this.UserService.createUser(CreateUserDto);
    }
}
