import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/v1/users.service';
import { JwtAuthGuard } from './jwt.guard';
import { CreateUserDto } from 'src/modules/users/v1/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() registerDto: CreateUserDto) {
        const hashedPassword = await this.usersService.hashPassword(registerDto.password);
        const newUser = await this.usersService.create({ ...registerDto, password: hashedPassword });
        return this.authService.login(newUser);
    }

    @Post('me')
    @UseGuards(JwtAuthGuard)
    async me(@Req() req) {
        return req.user;
    }

}
