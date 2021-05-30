import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

class CreateAddressDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly country: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly city: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly addressLine: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly tel: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly avatar: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly address: CreateAddressDto;
}