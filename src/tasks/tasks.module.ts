import { Module } from '@nestjs/common';
import { TasksController } from '../tasks/controllers/tasks.controller';
import { TasksService } from '../tasks/services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../tasks/entities/task.entity';
import { ProjectsEntity } from '../projects/entities/projects.entity';
import { ProjectsService } from '../projects/services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ProjectsEntity])],
  providers: [TasksService, ProjectsService],
  controllers: [TasksController],
  exports: [TasksService, TypeOrmModule]

})
export class TasksModule {}