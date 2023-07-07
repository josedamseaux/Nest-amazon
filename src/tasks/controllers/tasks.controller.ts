import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TasksDTO } from '../dto/task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access_level.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TASKS')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {

    constructor(private readonly taskService: TasksService) { }


    @AccessLevel(50)
    @Post('create/:projectId')
    public async createTask(@Body() body: TasksDTO, @Param('projectId') projectId: string){
        return this.taskService.createTask(body, projectId)
    }

    @Get('all')
    public async getTasks(){
        return this.taskService.getTasks()
    }
}
