import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity) private readonly userProjectRepository: Repository<UsersProjectsEntity>) 
    {}

  getHello(): string {
    return 'Hello Wolrd desde User!';
  }

  async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT)
      return await this.userRepository.save(body)
    } catch (error) {
      console.log(error)
    }
  }

  async findUsers(): Promise<UsersEntity[]> {
    try {
      const user: UsersEntity[] = await this.userRepository.find()
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

  async findUserById(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository.createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')

        .getOne()
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró el usuario'
        })
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  async findBy({key, value}:{key: keyof UserDTO, value: any}){
    try {
      const user = this.userRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where({[key]: value})
      .getOne()
      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  async updateUser(id: string, body: UserUpdateDTO): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body)
      if (user.affected == 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se modificó'
        })
      } else {
        return user
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id)
      if (user.affected == 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultados'
        })
      } else {
        return user
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  async addToProject(body: UserToProjectDTO) {
    try {
      return await this.userProjectRepository.save(body)
    } catch (error) {
      console.log(error.message)
    }
  }

}
