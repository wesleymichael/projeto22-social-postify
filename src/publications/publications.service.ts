import { ForbiddenException, Injectable } from '@nestjs/common';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly repository: PublicationsRepository) {}

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
}
