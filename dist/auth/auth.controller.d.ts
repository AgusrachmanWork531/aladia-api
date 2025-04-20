import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/v1/users.service';
import { CreateUserDto } from 'src/modules/users/v1/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(registerDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    me(req: any): Promise<any>;
}
