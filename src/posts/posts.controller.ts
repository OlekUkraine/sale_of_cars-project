import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MPost } from './posts.model';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({ status: 200, type: MPost })
  @Roles('admin', 'manager')
  @UseGuards(RolesGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('images'))
  async createPost(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postService.create(dto, image);
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @Roles('admin', 'manager')
  @UseGuards(RolesGuard)
  @Delete('/delete/:postId')
  // @UseInterceptors(FileInterceptor('images'))
  async deletePost(@Param('postId') postId: number) {
    return this.postService.delete(postId);
  }
}
