import { PublicationDTO } from './dtos/publications.dto';
import { PublicationsService } from './publications.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async createPublication(@Body() body: PublicationDTO) {
    return await this.publicationsService.createPublication(body);
  }
}
