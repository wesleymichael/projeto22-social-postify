import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
