import { Schema } from 'mongoose';
import { UserSchema } from 'src/user/user.schema';

export const TopicSchema = new Schema({
  title: { type: String, require: true },
  image: { type: String, default: null },
  users: [UserSchema],
  lastMessage: { type: String, default: null },
  updated_at: { type: Date, default: Date.now },
  workspace: {  type: String, default: null },
});

TopicSchema.pre('save', function(next) {
  const currentDate = new Date();

  (this as any).updated_at = currentDate;
  next();
});

// TopicSchema.index({ title: 1 }, { unique: false });
