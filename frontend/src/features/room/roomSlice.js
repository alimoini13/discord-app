import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { login, register } from '../../api';

// export const loginUser = createAsyncThunk(
//   'user/loginUser',
//   async ({ mail, password }) => {
//     const response = await login({ mail, password });
//     console.log(response, 'response');
//     if (response.error) {
//       throw Error(response.exception.response.data);
//     }
//     return response.data;
//   }
// );
// export const registerUser = createAsyncThunk(
//   'user/registerUser',
//   async ({ username, mail, password }) => {
//     const response = await register({ username, mail, password });
//     if (response.error) {
//       throw Error(response.exception.response.data);
//     }
//     return response.data;
//   }
// );
const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};
const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setOpenRoom: (state, action) => {
      state.isUserRoomCreator = action.payload.isUserRoomCreator;
      state.isUserInRoom = action.payload.isUserInRoom;
    },
    setRoomDetails: (state, action) => {
      console.log('setRoomDetails', action.payload);
      state.roomDetails = action.payload.roomId;
    },
    setActiveRooms: (state, action) => {
      state.activeRooms = [...action.payload.rooms];
    },
    setLocalStream: (state, action) => {},
    setRemoteStreams: (state, action) => {},
    setAudioOnly: (state, action) => {},
    setScreenShareStream: (state, action) => {},
  },
});
export const {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setAudioOnly,
  setScreenShareStream,
} = roomSlice.actions;
export default roomSlice.reducer;
