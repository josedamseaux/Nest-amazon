import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interfaces/project.interface";
import { UsersProjectsEntity } from "../../users/entities/usersProjects.entity";
import { TaskEntity } from "../../tasks/entities/task.entity";

@Entity({name: 'projects'})
export class ProjectsEntity extends BaseEntity implements IProject{
    
    @Column({unique:true})
    name: string;

    @Column({unique:true})
    description: string;

    @OneToMany(() => UsersProjectsEntity, usersProjects => usersProjects.project)
    usersIncludes: UsersProjectsEntity[]

    @OneToMany(() => TaskEntity, tasks => tasks.project)
    tasks: TaskEntity[];
}