import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IMessage } from "./message.interface";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TopicService } from "src/topic/topic.service";
import { SendMessageDto } from "./dto/send-message-dto";

@Injectable()
export class MessageService {
  private connectedTopics: { topicId: string; onUpdate: Function }[] = [];

  constructor(
    @InjectModel('Message') private readonly messageModel: Model<IMessage>,
    private readonly topicService: TopicService,
    private readonly userService: UserService
  ) {}

  connectTopic(topicId: string, onUpdate: Function) {
    const user = this.connectedTopics.find(item => item.topicId === topicId);
    if (user) {
      user.onUpdate = onUpdate;
      return;
    }
    this.connectedTopics = [ ...this.connectedTopics, { topicId, onUpdate } ];
  }

  disconnectedTopic(topicId: string) {
    const userPos = this.connectedTopics.findIndex(item => item.topicId === topicId);

    if (userPos > -1) {
      this.connectedTopics = [
        ...this.connectedTopics.slice(0, userPos),
        ...this.connectedTopics.slice(userPos + 1)
      ];
    }
  }

  async findByTopicId(topicId: string): Promise<IMessage[]> {
    const topic = await this.topicService.findById(topicId);
    const messages = await this.messageModel.find({ 'topic._id': Types.ObjectId(topicId) }).exec();

    return messages;
  }

  async sendMessage(sendMessageDto: SendMessageDto) {
    const topic = await this.topicService.findById(sendMessageDto.topicId);
    const user = await this.userService.find(sendMessageDto.authorId);
    const message = {
      text: sendMessageDto.text,
      author: user,
      topic,
    };

    this.connectedTopics.filter(item => sendMessageDto.topicId === item.topicId).forEach(({ onUpdate }) => onUpdate(message));

    return await new this.messageModel(message).save();
  }
}