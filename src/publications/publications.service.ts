import {
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { PublicationsRepository } from './publications.repository';
import { PublicationDTO } from './dtos/publications.dto';
import { MediasService } from 'src/medias/medias.service';

@Injectable()
export class PublicationsService {
  constructor(
    @Inject(forwardRef(() => MediasService))
    private readonly mediasService: MediasService,
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

    //TODO
    //verificar se postId existe

    return await this.repository.createPublication(body);
  }
}
