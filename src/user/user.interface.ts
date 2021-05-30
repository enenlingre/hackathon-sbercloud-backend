import { Document } from "mongoose"

interface IAddress {
  readonly country: string;
  readonly city: string;
  readonly addressLine: string;
}

export interface IUser extends Document {
  readonly tel: string;
  readonly email: string;
  readonly name: string;
  readonly address: IAddress;
  readonly avatar: string;
}

export interface IReadableUser {
  readonly tel: string;
  readonly email: string;
  readonly name: string;
  readonly address: IAddress;
  readonly avatar: string;
  code?: string;
}
