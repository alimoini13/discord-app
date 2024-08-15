import { Server } from 'socket.io';
import { verifyTokenSocket } from './middleware/authSocket.js';
import { newConnectionHandler } from './socketHandlers/newConnectionHandler.js';
import { disconnectHandler } from './socketHandlers/disconnectHandler.js';
import { getOnlineUsers, setSocketServerInstance } from './serverStore.js';
('socket.io');

export const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  setSocketServerInstance(io);
  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });
  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers();
    io.emit('online-users', { onlineUsers });
  };
  io.on('connection', (socket) => {
    console.log('user connected');
    console.log(socket.id);

    newConnectionHandler(socket, io);
    emitOnlineUsers();
    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};
