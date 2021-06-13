import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';
import { MessageService } from './message.service';


@WebSocketGateway({ namespace: 'messages' })
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private messageService: MessageService,
  ) {}

  async handleConnection(socket) {
    const topicId = socket.handshake.query.token;
    socket.join(topicId);

    this.messageService.connectTopic(topicId, topic => {
      this.server.in(topicId).emit('update', topic);
    });
  }

  async handleDisconnect(socket) {
    const topicId = socket.handshake.query.token;

    this.messageService.disconnectedTopic(topicId);
    //TODO: emit о том что юзер офлайн, и на фронте менять статус
  }
}