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
import { TopicService } from './topic.service';


@WebSocketGateway({ namespace: 'topics' })
export class TopicGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private topicService: TopicService,
  ) {}

  async handleConnection(socket) {
    const userId = socket.handshake.query.token;
    socket.join(userId);

    this.topicService.connectUser(userId, topic => {
      this.server.in(userId).emit('update', topic);
    });
  }

  async handleDisconnect(socket) {
    const userId = socket.handshake.query.token;

    this.topicService.disconnectedUser(userId);
    //TODO: emit о том что юзер офлайн, и на фронте менять статус
  }

  // @SubscribeMessage('update')
  // async onUpdate(client, data: any) {
  //   const event: string = 'update';
  //   const result = data[0];

  //   // await this.topicService.update() roomService.addMessage(result.message, result.room);
  //   client.broadcast.to(result.room).emit(event, result.message);

  //   return Observable.create(observer =>
  //     observer.next({ event, data: result.message })
  //   );
  // }

  // @SubscribeMessage('join')
  // async onRoomJoin(client, data: any): Promise<any> {
  //   client.join(data[0]);

  //   const messages = await this.roomService.findMessages(data, 25);

  //   // Send last messages to the connected user
  //   client.emit('message', messages);
  // }

  // @SubscribeMessage('leave')
  // onRoomLeave(client, data: any): void {
  //   client.leave(data[0]);
  // }
}