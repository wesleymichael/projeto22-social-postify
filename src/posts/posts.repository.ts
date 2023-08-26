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

  getPosts() {
    return this.prisma.posts.findMany();
  }

  getPostById(id: number) {
    return this.prisma.posts.findFirst({
      where: { id },
    });
  }

  updatePost(id: number, data: PostsDTO) {
    return this.prisma.posts.update({
      data,
      where: { id },
    });
  }

  deletePost(id: number) {
    return this.prisma.posts.delete({
      where: { id },
    });
  }
}
