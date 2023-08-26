import { Module, forwardRef } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { PublicationsRepository } from './publications.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediasModule } from 'src/medias/medias.module';

@Module({
  imports: [PrismaModule, forwardRef(() => MediasModule)],
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationsRepository],
  exports: [PublicationsService],
})
export class PublicationsModule {}
