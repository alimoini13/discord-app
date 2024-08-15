import io from 'socket.io-client';
import {
  setFriends,
  setOnlineUsers,
  setPendingFriendsInvitations,
} from '../features/friend/friendSlice';
import { store } from './../store';
let socket = null;
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.userDetails.token;

  const SOCKET_URL =
    window.location.host.indexOf('localhost') >= 0
      ? 'http://localhost:5002'
      : window.location.host;
  socket = io(SOCKET_URL, {
    auth: {
      token: jwtToken,
    },
  });
  socket.on('connect', () => {
    console.log('succesfully connected with socket.io server');
    console.log(socket.id);
  });
  socket.on('friends-invitations', (data) => {
    const { pendingInvitations } = data;
    console.log(pendingInvitations, 'Pending Invitation');
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', (data) => {
    const { friends } = data;
    // console.log('socket connection friends', friends);
    store.dispatch(setFriends(friends));
  });
  socket.on('online-users', (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });
};
