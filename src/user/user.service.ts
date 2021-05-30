import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUser } from "./user.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    return await new this.userModel(createUserDto).save();
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async findByTel(tel: string): Promise<IUser> {
    return await this.userModel.findOne({ tel }).exec();
  }

  async update(tel: string, payload: Partial<CreateUserDto>) {
    return this.userModel.updateOne({ tel }, payload);
  }
}