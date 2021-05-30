import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';

const redisAdapter = redisIoAdapter(process.env.REDIS_URL);

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}

// import { IoAdapter } from '@nestjs/platform-socket.io';
// import * as redisIoAdapter from 'socket.io-redis';

// export class RedisIoAdapter extends IoAdapter {
//   createIOServer(port: number): any {
//     const server = super.createIOServer(port);
//     const redisAdapter = redisIoAdapter(
//       {
//         host: process.env.REDIS_HOST,
//         port: parseInt(process.env.REDIS_PORT),
//       });
//     server.adapter(redisAdapter);
//     return server;
//   }
// }