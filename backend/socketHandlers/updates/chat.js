import Conversation from './../../models/conversation.js';
import {
  getActiveConnections,
  getSocketServerInstance,
} from './../../serverStore.js';

export const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: 'username _id',
    },
  });

  if (conversation) {
    const io = getSocketServerInstance();

    if (toSpecifiedSocketId) {
      // initial update of chat history when selecting a chat conversation

      return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    // check if users of this conversation are online
    // if yes emit to them update of messages

    conversation.participants.forEach((userId) => {
      const activeConnections = getActiveConnections(userId.toString());

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit('direct-chat-history', {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};
