import { PublicationDTO } from './dtos/publications.dto';
import { PublicationsService } from './publications.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async createPublication(@Body() body: PublicationDTO) {
    return await this.publicationsService.createPublication(body);
  }

  @Get()
  async getPublications() {
    return await this.publicationsService.getPublications();
  }
}
