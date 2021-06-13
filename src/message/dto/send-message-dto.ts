import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SendMessageDto {
  @ApiProperty()
  @IsString()
  readonly text: string;

  @ApiProperty()
  @IsString()
  readonly authorId: string;

  @ApiProperty()
  @IsString()
  readonly topicId: string;
}