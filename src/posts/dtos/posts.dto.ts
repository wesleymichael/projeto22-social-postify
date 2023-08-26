import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class PostsDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  image: string;
}
