import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthBody } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    @Post('login')
    async login(@Body() body: AuthBody) {
        const userValidate = await this.authService.validateUser(body.username, body.password)
        if(!userValidate){
            throw new UnauthorizedException('Data not found')
        }
        const jwt = await this.authService.generateJWT(userValidate)
        return jwt
    }
}
