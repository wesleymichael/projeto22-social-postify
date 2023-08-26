import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostsDTO } from './dtos/posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) {}

  async createPost(body: PostsDTO) {
    return await this.repository.createPost(body);
  }

  async getPosts() {
    const posts = await this.repository.getPosts();
    return posts.map((post) => ({
      id: post.id,
      text: post.text,
      title: post.title,
      ...(post.image !== null ? { image: post.image } : {}),
    }));
  }
}
