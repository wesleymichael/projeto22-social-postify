import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDTO } from './dtos/posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() body: PostsDTO) {
    return await this.postsService.createPost(body);
  }

  @Get()
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get('/:id')
  // eslint-disable-next-line prettier/prettier
  async getPostsById(@Param('id', new ParseIntPipe({ exceptionFactory: () => new BadRequestException('Invalid ID format') })) id: number) {
    return await this.postsService.getPostById(id);
  }

  @Put('/:id')
  async updatePost(
    // eslint-disable-next-line prettier/prettier
    @Param('id', new ParseIntPipe({ exceptionFactory: () => new BadRequestException('Invalid ID format') })) id: number,
    @Body() body: PostsDTO,
  ) {
    return await this.postsService.updatePost(id, body);
  }

  @Delete('/:id')
  // eslint-disable-next-line prettier/prettier
  async deletePost(@Param('id', new ParseIntPipe({ exceptionFactory: () => new BadRequestException('Invalid ID format') })) id: number) {
    return await this.postsService.deletePost(id);
  }
}
