import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { ACCES_LEVEL } from 'src/constants';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectsEntity) private readonly projectRepository: Repository<ProjectsEntity>,
              @InjectRepository(UsersProjectsEntity) private readonly userProjectsRepository: Repository<UsersProjectsEntity>,
              private userService: UsersService) {}

  getHello(): string {
    return 'Hello World desde Projects!';
  }

  async getProjects(): Promise<ProjectsEntity[]> {
    try {
      const user: ProjectsEntity[] = await this.projectRepository.find()
      if (user.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultados'
        })
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  async createProject(body: ProjectDTO, userId: string): Promise<ProjectsEntity> {
    try {
      const user = await this.userService.findUserById(userId)
      await this.userProjectsRepository.save({
        accesLevel: ACCES_LEVEL.OWNER,
        user: user, 
        project: body
      })
      return await this.projectRepository.save(body)
    } catch (error) {
      console.log(error.message)
    }
  }

  async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const project: ProjectsEntity = await this.projectRepository.createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.usersIncludes', 'userInProject')
        .leftJoinAndSelect('userInProject.user', 'user')
        .getOne()
      if (!project) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontró el projecto'
        })
      }
      return project
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  async updateProject(id: string, body: ProjectUpdateDTO): Promise<UpdateResult> {
    try {
      const project: UpdateResult = await this.projectRepository.update(id, body)
      if (project.affected == 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se modificó'
        })
      } else {
        return project
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  async deleteProject(id: string): Promise<DeleteResult> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id)
      if (project.affected == 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultados'
        })
      } else {
        return project
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }


}
