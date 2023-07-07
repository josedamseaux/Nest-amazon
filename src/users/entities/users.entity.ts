import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interface";
import { UsersProjectsEntity } from "./usersProjects.entity";
import { Exclude } from "class-transformer";

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity implements IUser{

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    username: string;

    @Exclude()
    @Column()
    password: string;
    
    @Column({type: 'enum', enum: ROLES})
    role:  ROLES;

    // relacion de un usuario a muchos proyectos
    @OneToMany(() => UsersProjectsEntity, usersProjects => usersProjects.user)
    projectsIncludes: UsersProjectsEntity[]
}