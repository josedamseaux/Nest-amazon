import { BaseEntity } from "../../config/base.entity"
import { ACCES_LEVEL } from "../../constants/roles"
import { Column, Entity, ManyToOne } from "typeorm"
import { UsersEntity } from "./users.entity";
import { ProjectsEntity } from "../../projects/entities/projects.entity";

@Entity({name: 'users_projects'})
export class UsersProjectsEntity extends BaseEntity {

    @Column({type: 'enum', enum: ACCES_LEVEL})
    accesLevel: ACCES_LEVEL;

    // Many users to one project
    @ManyToOne(()=> UsersEntity, user => user.projectsIncludes)
    user: UsersEntity


    // Many projects to one user
    @ManyToOne(()=> ProjectsEntity, project => project.usersIncludes)
    project: ProjectsEntity
}