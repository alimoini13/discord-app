import { Server } from 'socket.io';
import { verifyTokenSocket } from './middleware/authSocket.js';
import { newConnectionHandler } from './socketHandlers/newConnectionHandler.js';
import { disconnectHandler } from './socketHandlers/disconnectHandler.js';
import { getOnlineUsers, setSocketServerInstance } from './serverStore.js';
import { directMessageHandler } from './socketHandlers/directMessageHandler.js';
import { directChatHistoryHandler } from './socketHandlers/directChatHistoryHandler.js';
import roomCreateHandler from './socketHandlers/roomCreateHandler.js';
import { roomJoinHandler } from './socketHandlers/roomJoinHandler.js';
import { roomLeaveHandler } from './socketHandlers/roomLeaveHandler.js';
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
    socket.on('direct-message', (data) => {
      directMessageHandler(socket, data);
    });
    socket.on('direct-chat-history', (data) => {
      directChatHistoryHandler(socket, data);
    });
    socket.on('room-create', () => {
      roomCreateHandler(socket);
    });
    socket.on('room-join', (data) => {
      roomJoinHandler(socket, data);
    });
    socket.on('room-leave', (data) => {
      roomLeaveHandler(socket, data);
    });
    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};
