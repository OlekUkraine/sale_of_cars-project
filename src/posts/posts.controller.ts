import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MPost } from './posts.model';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({ status: 200, type: MPost })
  @Post('/create')
  @UseInterceptors(FileInterceptor('images'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postService.create(dto, image);
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @Delete('/delete/:postId')
  // @UseInterceptors(FileInterceptor('images'))
  deletePost(@Param('postId') postId: number) {
    return this.postService.delete(postId);
  }
}
