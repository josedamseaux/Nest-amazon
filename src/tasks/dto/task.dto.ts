import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { STATUS_TASK } from "src/constants/status-task";
import { ProjectsEntity } from "src/projects/entities/projects.entity";

export class TasksDTO {
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @IsNotEmpty()
    @IsString()
    taskDescription: string;

    @IsNotEmpty()
    @IsEnum(STATUS_TASK)
    status: STATUS_TASK;

    @IsNotEmpty()
    @IsString()
    responsableName: string;
    
    @IsOptional()
    project: ProjectsEntity;
}