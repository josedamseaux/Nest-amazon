import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access_level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { HttpCustomService } from 'src/providers/http/http.service';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@ApiTags('PROJECTS')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService, private readonly httpCustomService: HttpCustomService) { }

  @Get()
  getHello() {
    return this.projectsService.getHello()
  }


  @PublicAccess()
  
  @Get('list/api')
  public async listApi() {
    return await this.httpCustomService.apiFindAll()
  }


  @Get('all')
  public async getProjects() {
    return await this.projectsService.getProjects()
  }

  @Roles('CREATOR')
  @Post('create/userOwner/:userId')
  public async addProject(@Body() body: ProjectDTO, @Param('userId') userId: string) {
    return await this.projectsService.createProject(body, userId)
  }

  @Get(':projectId')
  public async findProjectById(@Param('projectId') id: string) {
    return await this.projectsService.findProjectById(id)
  }

  @AccessLevel(50)
  @Put('edit/:projectId')
  public async updateProject(@Param('projectId') id: string, @Body() body: ProjectUpdateDTO) {
    return await this.projectsService.updateProject(id, body)
  }

  @Delete('delete/:projectId')
  public async deleteProject(@Param('projectId') id: string) {
    return await this.projectsService.deleteProject(id)
  }

}
