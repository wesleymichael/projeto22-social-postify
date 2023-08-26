import {
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { PublicationsRepository } from './publications.repository';
import { PublicationDTO } from './dtos/publications.dto';
import { MediasService } from 'src/medias/medias.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PublicationsService {
  constructor(
    @Inject(forwardRef(() => MediasService))
    private readonly mediasService: MediasService,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
    private readonly repository: PublicationsRepository,
  ) {}

  async getPublicationByMediaId(mediaId: number) {
    const publication = await this.repository.getPublicationByMediaId(mediaId);
    if (publication) {
      throw new ForbiddenException('MediaId belongs to publication data!');
    }
  }

  async getPublicationByPostId(postId: number) {
    const publication = await this.repository.getPublicationByPostId(postId);
    if (publication) {
      throw new ForbiddenException('PostId belongs to publication data!');
    }
  }

  async createPublication(body: PublicationDTO) {
    await this.mediasService.getMediaById(body.mediaId);
    await this.postsService.getPostById(body.postId);

    return await this.repository.createPublication(body);
  }
}
