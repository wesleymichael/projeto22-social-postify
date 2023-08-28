import { Injectable } from '@nestjs/common';
import { PostsDTO } from './dtos/posts.dto';
import { PrismaService } from '@/prisma/prisma.service';

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
