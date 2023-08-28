import { PrismaService } from '@/prisma/prisma.service';

export async function cleanDB(prisma: PrismaService) {
  await prisma.publications.deleteMany();
  await prisma.medias.deleteMany();
  await prisma.posts.deleteMany();
}
