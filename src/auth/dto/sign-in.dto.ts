import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInDto {
  @IsNotEmpty()
  @ApiProperty()
  tel: string; 

  code?: string;
}