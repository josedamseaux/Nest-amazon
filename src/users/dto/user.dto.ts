import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ACCES_LEVEL, ROLES } from "src/constants";
import { UsersEntity } from "../entities/users.entity";
import { ProjectsEntity } from "src/projects/entities/projects.entity";

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @IsNotEmpty()
    @IsNumber()
    age: number;
    
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
}

export class UserUpdateDTO {
    @IsOptional()
    @IsString()
    firstName: string;
    
    @IsOptional()
    @IsString()
    lastName: string;
    
    @IsOptional()
    @IsNumber()
    age: number;
    
    @IsOptional()
    @IsString()
    email: string;
    
    @IsOptional()
    @IsString()
    username: string;
    
    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
}

export class UserToProjectDTO {
    @IsNotEmpty()
    @IsUUID()
    user: UsersEntity;
    
    @IsNotEmpty()
    @IsUUID()
    project: ProjectsEntity;
    
    @IsNotEmpty()
    @IsEnum(ACCES_LEVEL)
    accesLevel: ACCES_LEVEL

}