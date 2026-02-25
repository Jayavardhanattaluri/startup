import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

const socketHandler = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    socket.on('ride:update', (data) => {
      io.emit('ride:update', data);
    });

    socket.on('disconnect', () => {
      // no-op
    });
  });

  return io;
};

export default socketHandler;
