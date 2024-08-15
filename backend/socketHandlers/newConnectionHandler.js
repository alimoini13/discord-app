import { addNewConnectedUser } from './../serverStore.js';
import {
  updateFriends,
  updateFriendsPendingInvitations,
} from './updates/friends.js';
export const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending friends invitations list
  updateFriendsPendingInvitations(userDetails.userId);

  // // update friends list
  updateFriends(userDetails.userId);
};
