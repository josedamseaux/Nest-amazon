import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { TasksDTO } from '../dto/task.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
        private readonly projectService: ProjectsService) { }


    public async createTask(body: TasksDTO, projectId: string): Promise<TaskEntity> {
        
            const project = await this.projectService.findProjectById(projectId)
            console.log(project)
            if (project.id === undefined) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'No se encontró el projecto'
                })
            } else {
                return await this.taskRepository.save({
                    ...body,
                    project
                })
            }
    }

    public async getTasks(): Promise<TaskEntity[]> {
        try {
            const tasks = await this.taskRepository.find()
            return tasks
        } catch (error) {
            throw ErrorManager.createSignatureError('No se pudo encontrar tareas')
        }

    }


}
