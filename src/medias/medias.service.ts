import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { MediaDTO } from './dtos/medias.dto';
import { PublicationsService } from 'src/publications/publications.service';

@Injectable()
export class MediasService {
  constructor(
    private readonly repository: MediasRepository,
    private readonly publicationService: PublicationsService,
  ) {}

  async createMedia(body: MediaDTO) {
    await this.checkDuplicateMediaRecord(body);
    return await this.repository.createMedia(body);
  }

  async getMedias() {
    return await this.repository.getMedias();
  }

  async getMediaById(id: number) {
    const media = await this.checkExistenceMedia(id);
    return media;
  }

  async updateMedia(id: number, body: MediaDTO) {
    await this.checkExistenceMedia(id);
    await this.checkDuplicateMediaRecord(body);
    return await this.repository.updateMedia(id, body);
  }

  async deleteMedia(id: number) {
    await this.publicationService.getPublicationByMediaId(id);
    await this.checkExistenceMedia(id);
    return await this.repository.deleteMedia(id);
  }

  private async checkExistenceMedia(id: number) {
    const media = await this.repository.getMediaById(id);
    if (!media) {
      throw new NotFoundException('Media not found!');
    }
    return media;
  }

  private async checkDuplicateMediaRecord(body: MediaDTO) {
    const media = await this.repository.findMediaByUsernameAndTitle(body);
    if (media) {
      throw new ConflictException(
        'Record with title and username combination already exists',
      );
    }
  }
}
