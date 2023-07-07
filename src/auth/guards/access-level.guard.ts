import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from 'src/constants';
import { ACCESS_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { Request } from 'express';
import { UsersService } from 'src/users/services/users.service';


@Injectable()
export class AccessLevelGuard implements CanActivate {

  constructor(private readonly reflector: Reflector, private readonly usersServices: UsersService) { }

  async canActivate(context: ExecutionContext) {

    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())

    if (isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY, context.getHandler())

    const accessLevel = this.reflector.get<number>(ACCESS_LEVEL_KEY, context.getHandler())

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler())

    const req = context.switchToHttp().getRequest<Request>()

    const { roleUser, idUser } = req

    if (accessLevel === undefined) {
      if (roles === undefined) {
        if (!admin) {
          return true;
        } else if (admin && roleUser === admin) {
          return true;
        } else {
          throw new UnauthorizedException(
            'No tienes permisos para esta operacion',
          );
        }
      }
    }

    if (roleUser === ROLES.ADMIN || roleUser === ROLES.CREATOR) {
      return true
    }

    const user = await this.usersServices.findUserById(idUser)

    console.log(roleUser)

    const userExistInProject = user.projectsIncludes.find(project => project.project.id === req.params.projectId)

    if (!userExistInProject || undefined) {
      throw new UnauthorizedException('No perteneces al projecto')
    }

    if (accessLevel != userExistInProject.accesLevel) {
      throw new UnauthorizedException('No tienes nivel de acceso necesario al projecto')
    } else {
      return true;
    }

  }
}
