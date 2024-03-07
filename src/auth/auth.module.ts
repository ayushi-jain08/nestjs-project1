import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth.constant';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    imports: [UserModule, PassportModule, JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '300s' },
    }),],
    providers: [AuthService, LocalStrategy]
})
export class AuthModule { }
