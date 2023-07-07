import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('USERS')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {

    constructor(private readonly usersServices: UsersService) { }

    @PublicAccess()
    @Get()
    getHello(): string {
      return this.usersServices.getHello();
    }
    
    @Roles('ADMIN')
    @Get('all')
    public async getAllUsers() {
      return await this.usersServices.findUsers()
    }
      
    @PublicAccess()
    @Post('register')
    public async registerUser(@Body() body: UserDTO) {
      return await this.usersServices.createUser(body)
    }

    @Get(':id')
    public async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
      return await this.usersServices.findUserById(id)
    }

    @Put(':id')
    public async updateUser(@Param('id') id: string, @Body() body: UserUpdateDTO) {
      return await this.usersServices.updateUser(id, body)
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: string) {
      return await this.usersServices.deleteUser(id)
    }

    // 

    @Post('add-to-project')
    public async addToProject(@Body() body: UserToProjectDTO) {
      return await this.usersServices.addToProject(body)
    }

}
