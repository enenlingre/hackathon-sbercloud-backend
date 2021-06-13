import { Headers, Controller, Get, Post, ValidationPipe, Body, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { TopicService } from "./topic.service";

@ApiTags('topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get('/all/:workspaceId')
  async findAll(@Param('workspaceId') workspaceId: string, @Headers() headers) {
    // TODO: translate to jwt
    const userId = headers.authorization;
    return await this.topicService.findByUserIdAndWorkspace(userId, workspaceId as any);
  }

  @Post('/create')
  async create(@Body(new ValidationPipe()) createTopicDto: CreateTopicDto) {
    // TODO: translate to jwt
    // const userId = headers.Autorization;
    return await this.topicService.create(createTopicDto);
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) topic: CreateTopicDto): Promise<void> {
    await this.topicService.update(id, topic);
  }
}