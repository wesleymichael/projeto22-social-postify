import { IsNotEmpty, IsString } from 'class-validator';

export class PostsDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  image: string;
}
