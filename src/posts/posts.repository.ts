import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsDTO } from './dtos/posts.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createPost(data: PostsDTO) {
    return this.prisma.posts.create({
      data,
    });
  }
}
