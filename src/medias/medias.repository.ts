import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaDTO } from './dtos/medias.dto';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  createMedia(data: MediaDTO) {
    return this.prisma.medias.create({ data });
  }

  findMediaByUsernameAndTitle(data: MediaDTO) {
    return this.prisma.medias.findFirst({
      where: {
        title: data.title,
        username: data.username,
      },
    });
  }
  getMedias() {
    return this.prisma.medias.findMany({
      select: {
        id: true,
        title: true,
        username: true,
      },
    });
  }
  getMediaById(id: number) {
    return this.prisma.medias.findUnique({
      select: {
        id: true,
        title: true,
        username: true,
      },
      where: {
        id,
      },
    });
  }
}
