import { Document } from "mongoose"
import { ITopic } from "src/topic/topic.interface";
import { IUser } from "src/user/user.interface";

export interface IMessage extends Document {
  readonly text: string;
  readonly author: IUser;
  readonly updated_at: Date;
  readonly topic: ITopic;
}
