import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  tel: { type: String, required: true },
  email: { type: String, default: null },
  name: { type: String, default: null },
  address: { 
    country: { type: String, default: null },
    city: { type: String, default: null },
    addressLine: { type: String, default: null },
  },
});
