import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { MessageGateway } from "./message.gateway";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { MessageSchema } from "./message.schema";
import { TopicModule } from "src/topic/topic.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]), TopicModule, UserModule],
  exports: [MessageService],
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
})
export class MessageModule {}
