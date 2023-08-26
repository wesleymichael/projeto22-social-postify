import { Module, forwardRef } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { MediasRepository } from './medias.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PublicationsModule } from 'src/publications/publications.module';

@Module({
  imports: [PrismaModule, forwardRef(() => PublicationsModule)],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
  exports: [MediasService],
})
export class MediasModule {}
