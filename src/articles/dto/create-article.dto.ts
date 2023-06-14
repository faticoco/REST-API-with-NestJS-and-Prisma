import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  isNotEmpty,
  isString,
} from 'class-validator';


export class CreateArticleDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  @MaxLength(500)
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean = false;
}

// title can't be empty or shorter than 5 characters.
// description has to have a maximum length of 300.
// body and description can't be empty.
// title, description and body must be of type string and published must be of type boolean.