import { Injectable } from '@nestjs/common';
import { PublicationDTO } from './dtos/publications.dto';
import { PrismaService } from '@/prisma/prisma.service';

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

  getPublicationById(id: number) {
    return this.prisma.publications.findUnique({
      where: { id },
    });
  }

  updatePublication(id: number, data: PublicationDTO) {
    return this.prisma.publications.update({
      data,
      where: { id },
    });
  }

  deletePublication(id: number) {
    return this.prisma.publications.delete({
      where: { id },
    });
  }
}
