import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private UserService: UserService, private jwtService: JwtService) { }
    async validateUser(email: string, password: string) {
        const user = await this.UserService.findByEmail(email)
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user._id, username: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
