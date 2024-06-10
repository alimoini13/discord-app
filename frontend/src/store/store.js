import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import alertReducer from './features/alert/alertSlice';
export const store = configureStore({
  reducer: { user: userReducer, alert: alertReducer },
});
