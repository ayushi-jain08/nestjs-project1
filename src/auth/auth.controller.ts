import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuards } from './auth.guard';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() loginDto: any) {
        return this.authService.validateUser(loginDto.email, loginDto.password)
    }
    @UseGuards(AuthGuards)
    @Get('profile')
    getProfile(@Req() req: Request) {
        return req.user;
    }
}
