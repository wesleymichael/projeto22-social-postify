import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostsDTO } from './dtos/posts.dto';
import { Posts } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) {}

  async createPost(body: PostsDTO) {
    return await this.repository.createPost(body);
  }

  async getPosts() {
    const posts = await this.repository.getPosts();
    return this.formatPosts(posts);
  }

  async getPostById(id: number) {
    const post = await this.checkExistencePost(id);
    if (post.length === 0) {
      throw new NotFoundException('No record for submitted ID!');
    }
    return this.formatPosts(post);
  }

  private formatPosts(posts: Posts[]) {
    return posts.map((post) => ({
      id: post.id,
      text: post.text,
      title: post.title,
      ...(post.image !== null ? { image: post.image } : {}),
    }));
  }

  private async checkExistencePost(id: number) {
    const media = await this.repository.getPostById(id);
    if (!media) {
      throw new NotFoundException('Media not found!');
    }
    return media;
  }
}
