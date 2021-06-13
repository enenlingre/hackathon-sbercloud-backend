import { Headers, Controller, Get, Post, ValidationPipe, Body, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SendMessageDto } from "./dto/send-message-dto";
import { MessageService } from "./message.service";

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/all/:topicId')
  async findAll(@Param('topicId') topicId: string) {
    return await this.messageService.findByTopicId(topicId);
  }

  @Post('/send')
  async send(@Body(new ValidationPipe()) sendMessageDto: SendMessageDto) {
    return await this.messageService.sendMessage(sendMessageDto);
  }
}