import { PublicationsService } from './publications.service';
import { Controller } from '@nestjs/common';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}
}
