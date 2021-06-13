import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateTopicDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly image: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly users: CreateUserDto[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lastMessage: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly workspace: 'none' | 'sbercloud' | 'docker'
}