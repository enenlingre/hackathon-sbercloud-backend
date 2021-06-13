import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { TopicController } from "./topic.controller";
import { TopicGateway } from "./topic.gateway";
import { TopicSchema } from "./topic.schema";
import { TopicService } from "./topic.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema }]), UserModule],
  exports: [TopicService],
  providers: [TopicService, TopicGateway],
  controllers: [TopicController],
})
export class TopicModule {}
