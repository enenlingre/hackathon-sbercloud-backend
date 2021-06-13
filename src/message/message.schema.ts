import { Schema } from 'mongoose';
import { TopicSchema } from 'src/topic/topic.schema';
import { UserSchema } from 'src/user/user.schema';

export const MessageSchema = new Schema({
  text: { type: String, require: true },
  author: UserSchema,
  topic: TopicSchema,
  updated_at: { type: Date, default: Date.now },
});

MessageSchema.pre('save', function(next) {
  const currentDate = new Date();

  (this as any).updated_at = currentDate;
  next();
});

// TopicSchema.index({ title: 1 }, { unique: false });
