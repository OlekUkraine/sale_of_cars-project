import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MPost } from './posts.model';
import { User } from '../users/users.model';
import { FilesModule } from '../files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [JwtModule, SequelizeModule.forFeature([User, MPost]), FilesModule],
})
export class PostsModule {}
