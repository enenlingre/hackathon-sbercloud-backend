import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ITopic } from "./topic.interface";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTopicDto } from "./dto/create-topic.dto";

@Injectable()
export class TopicService {
  private connectedUsers: { userId: string; onUpdate: Function }[] = [];

  constructor(
    @InjectModel('Topic') private readonly topicModel: Model<ITopic>,
    private readonly userService: UserService
  ) {}

  connectUser(userId: string, onUpdate: Function) {
    const user = this.connectedUsers.find(item => item.userId === userId);
    if (user) {
      user.onUpdate = onUpdate;
      return;
    }
    this.connectedUsers = [ ...this.connectedUsers, { userId, onUpdate } ];
  }

  disconnectedUser(userId: string) {
    const userPos = this.connectedUsers.findIndex(item => item.userId === userId);

    if (userPos > -1) {
      this.connectedUsers = [
        ...this.connectedUsers.slice(0, userPos),
        ...this.connectedUsers.slice(userPos + 1)
      ];
    }
  }

  async findByUserId(userId: string): Promise<ITopic[]> {
    const topics = await this.topicModel.find({ 'users._id': Types.ObjectId(userId) }).exec();

    return topics;
  }

  async findByUserIdAndWorkspace(userId: string, workspaceId: 'none' | 'sbercloud' | 'docker'): Promise<ITopic[]> {
    const topics = await this.topicModel.find({ 'users._id': Types.ObjectId(userId), workspace: workspaceId }).exec();

    return topics;
  }

  async findById(topicId: string): Promise<ITopic> {
    return this.topicModel.findById(Types.ObjectId(topicId)).exec();
  }

  async create(createTopicDto: CreateTopicDto): Promise<ITopic> {
    this.connectedUsers.filter(item => createTopicDto.users.some(({ _id }: any) => String(_id) === item.userId)).forEach(({ onUpdate }) => onUpdate(createTopicDto));
    return await new this.topicModel(createTopicDto).save();
  }

  async update(topicId: string, payload: Partial<CreateTopicDto>) {
    const result = await this.topicModel.updateOne({ _id: topicId }, payload)
    const topic = await this.topicModel.findById(Types.ObjectId(topicId)).exec();
    this.connectedUsers.filter(item => topic.users.some(({ _id }) => String(_id) === item.userId)).forEach(({ onUpdate }) => onUpdate(topic));

    return result;
  }
}