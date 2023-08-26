import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
