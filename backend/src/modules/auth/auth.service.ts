import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './auth.constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const isMatch = user && await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password, __v, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        const { password, _id: id, ...rest } = user;

        return {
            access_token: this.jwtService.sign(payload, { secret: jwtConstants.secret }),
            user: { ...rest, id }
        };
    }
}