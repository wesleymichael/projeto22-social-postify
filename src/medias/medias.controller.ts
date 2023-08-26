import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MediaDTO } from './dtos/medias.dto';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediaService: MediasService) {}

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
}
