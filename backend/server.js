import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import friendInvitationRoutes from './routes/friendInvitationRoutes.js';
import { registerSocketServer } from './socketServer.js';
dotenv.config();
const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/friend-invitation', friendInvitationRoutes);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Mongodb Connected...'))
  .catch((err) => console.log(err));
const server = http.createServer(app);
registerSocketServer(server);
server.listen(PORT, () => {
  console.log(`Server Listen To ${PORT}`);
});
