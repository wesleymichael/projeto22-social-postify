import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { MediaDTO } from './dtos/medias.dto';

@Injectable()
export class MediasService {
  constructor(private readonly repository: MediasRepository) {}

  async createMedia(body: MediaDTO) {
    await this.checkDuplicateMediaRecord(body);
    return await this.repository.createMedia(body);
  }

  async getMedias() {
    return await this.repository.getMedias();
  }

  async getMediaById(id: number) {
    const media = await this.repository.getMediaById(id);
    if (!media) {
      throw new NotFoundException('Media not found!');
    }
    return media;
  }

  async updateMedia(id: number, body: MediaDTO) {
    const media = await this.repository.getMediaById(id);
    if (!media) {
      throw new NotFoundException('Media not found!');
    }
    await this.checkDuplicateMediaRecord(body);
    return await this.repository.updateMedia(id, body);
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
