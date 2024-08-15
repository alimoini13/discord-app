import User from '../../models/user.js';
import FriendInvitation from './../../models/friendInvitation.js';
import { updateFriendsPendingInvitations } from './../../socketHandlers/updates/friends.js';
// const FriendInvitation = require('../../models/friendInvitation');
// const friendsUpdates = require('../../socketHandlers/updates/friends');

export const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;
  console.log('POSTINVITE', targetMailAddress, mail, userId);
  // check if friend that we would like to invite is not user

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send('Sorry. You cannot become friend with yourself');
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please check mail address.`
      );
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send('Invitation has been already sent');
  }

  // check if the user whuch we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends?.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send('Friend already added. Please check friends list');
  }

  // create new invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invtiation has been successfully created we would like to update friends invitations if other user is online

  // send pending invitations update to specific user
  updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send('Invitation has been sent');
};
