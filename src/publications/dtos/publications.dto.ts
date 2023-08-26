import { IsInt, IsNotEmpty, Matches } from 'class-validator';

export class PublicationDTO {
  @IsInt()
  @IsNotEmpty()
  mediaId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;

  @Matches(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/, {
    message:
      'message: Invalid date format. Please use the ISO-8601 format (e.g., "2023-08-21T13:25:17.352Z")',
  })
  @IsNotEmpty()
  date: string;
}
