import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaDTO } from './dtos/medias.dto';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  createMedia(data: MediaDTO) {
    return this.prisma.medias.create({ data });
  }
}
