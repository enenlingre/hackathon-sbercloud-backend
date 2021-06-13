import { Document } from "mongoose"
import { IUser } from "src/user/user.interface";
// import { IUser } from "src/user/user.interface";

export interface ITopic extends Document {
  readonly image: string;
  readonly title: string;
  readonly users: IUser[];
  readonly lastMessage: string;
  readonly updated_at: Date;
  readonly workspace: 'none' | 'sbercloud' | 'docker'
}
