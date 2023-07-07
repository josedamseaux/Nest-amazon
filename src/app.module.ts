import { Module } from '@nestjs/common';
import { UsersModule } from './users/modules/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ProjectsModule } from './projects/modules/projects.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ProvidersModule } from './providers/providers.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
    isGlobal: true
  }),
  TypeOrmModule.forRoot(DataSourceConfig),
  UsersModule,
  ProjectsModule,
  AuthModule,
  TasksModule,
  ]
})
export class AppModule {}
