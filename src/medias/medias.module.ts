import { PrismaModule } from '@/prisma/prisma.module';
import { PublicationsModule } from '@/publications/publications.module';
import { Module, forwardRef } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { MediasRepository } from './medias.repository';

@Module({
  imports: [PrismaModule, forwardRef(() => PublicationsModule)],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
  exports: [MediasService],
})
export class MediasModule {}
