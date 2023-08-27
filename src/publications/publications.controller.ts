import { PublicationDTO } from './dtos/publications.dto';
import { PublicationsService } from './publications.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

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

  @Get('/:id')
  // eslint-disable-next-line prettier/prettier
  async getPublicationById(@Param('id', new ParseIntPipe({ exceptionFactory: () => new BadRequestException('Invalid ID format') })) id: number) {
    return await this.publicationsService.getPublicationById(id);
  }
}
