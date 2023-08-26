import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class PublicationDTO {
  @IsInt()
  @IsNotEmpty()
  mediaId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
