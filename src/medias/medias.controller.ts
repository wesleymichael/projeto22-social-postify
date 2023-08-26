import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MediaDTO } from './dtos/medias.dto';
import { MediasService } from './medias.service';
import { PublicationsService } from 'src/publications/publications.service';

@Controller('medias')
export class MediasController {
  constructor(
    private readonly mediaService: MediasService,
    private readonly publicationService: PublicationsService,
  ) {}

  @Post()
  async createMedia(@Body() body: MediaDTO) {
    return await this.mediaService.createMedia(body);
  }

  @Get()
  async getMedias() {
    return await this.mediaService.getMedias();
  }

  @Get('/:id')
  // eslint-disable-next-line prettier/prettier
  async getMediaById(@Param('id', new ParseIntPipe({ exceptionFactory: () => new BadRequestException('Invalid ID format') })) id: number) {
    return this.mediaService.getMediaById(id);
  }

  @Put('/:id')
  async updateMedia(
    // eslint-disable-next-line prettier/prettier
    @Param('id', new ParseIntPipe({ exceptionFactory: () => new BadRequestException('Invalid ID format') })) id: number,
    @Body() body: MediaDTO,
  ) {
    return this.mediaService.updateMedia(id, body);
  }

  @Delete('/:id')
  // eslint-disable-next-line prettier/prettier
  async deleteMedia(@Param('id', new ParseIntPipe({ exceptionFactory: () => new BadRequestException('Invalid ID format') })) id: number) {
    await this.publicationService.getPublicationByMediaId(id);
    return this.mediaService.deleteMedia(id);
  }
}
