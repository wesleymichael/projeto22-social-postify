import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDTO } from './dtos/posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() body: PostsDTO) {
    return await this.postsService.createPost(body);
  }
}
