import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicationDTO } from './dtos/publications.dto';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getPublicationByMediaId(mediaId: number) {
    return this.prisma.publications.findFirst({
      where: { mediaId },
    });
  }

  getPublicationByPostId(postId: number) {
    return this.prisma.publications.findFirst({
      where: { postId },
    });
  }

  createPublication(data: PublicationDTO) {
    return this.prisma.publications.create({ data });
  }

  getPublications() {
    return this.prisma.publications.findMany({
      select: {
        id: true,
        mediaId: true,
        postId: true,
        date: true,
      },
    });
  }
}
