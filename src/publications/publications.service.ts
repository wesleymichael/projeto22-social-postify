import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { PublicationsRepository } from './publications.repository';
import { PublicationDTO } from './dtos/publications.dto';
import { MediasService } from '@/medias/medias.service';
import { PostsService } from '@/posts/posts.service';

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

  async getPublications() {
    return await this.repository.getPublications();
  }

  async getPublicationById(id: number) {
    const publication = await this.checkExistencePublication(id);
    return [publication];
  }

  async updatePublication(id: number, body: PublicationDTO) {
    const publication = await this.checkExistencePublication(id);

    const currentDate = new Date().toISOString();
    if (publication.date.toISOString() < currentDate) {
      throw new ForbiddenException(
        'Publication that has already been published!',
      );
    }

    await this.mediasService.getMediaById(body.mediaId);
    await this.postsService.getPostById(body.postId);

    return await this.repository.updatePublication(id, body);
  }

  async deletePublication(id: number) {
    await this.checkExistencePublication(id);
    return await this.repository.deletePublication(id);
  }

  private async checkExistencePublication(publicationId: number) {
    const publication = await this.repository.getPublicationById(publicationId);
    if (!publication) {
      throw new NotFoundException('Publication not found');
    }
    return publication;
  }
}
