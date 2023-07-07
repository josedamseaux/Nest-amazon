import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from 'src/constants';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext) {

    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())
    
    if (isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY, context.getHandler())

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler() )

    const req = context.switchToHttp().getRequest<Request>()

    const { roleUser } = req

    if(roleUser === undefined){
      if(!admin){
        return true
      }
      else if(admin && roleUser === admin){
        return true
      } else {
        throw new UnauthorizedException('No tienes permisos')
      }
    }

    if(roleUser === 'ADMIN'){
      return true
    }
   
    console.log(roleUser)

    return true;
  }

}
