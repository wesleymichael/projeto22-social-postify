import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { MediaDTO } from './dtos/medias.dto';

@Injectable()
export class MediasService {
  constructor(private readonly repository: MediasRepository) {}

  async createMedia(body: MediaDTO) {
    const media = await this.repository.findMediaByUsernameAndTitle(body);
    if (media) {
      throw new HttpException(
        'Record with title and username combination already exists',
        HttpStatus.CONFLICT,
      );
    }
    return await this.repository.createMedia(body);
  }
  async getMedias() {
    return await this.repository.getMedias();
  }
}
