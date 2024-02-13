import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import mongoose from 'mongoose';
const {handleConnection} = require('./ioHandlers/handleConnection')

dotenv.config();

const app:Application = express();

const PORT = process.env.PORT
const httpServer = createServer()
const io = new Server(httpServer,{
  cors: {
    origin: process.env.CLIENT_URL
  }
})
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  })
);
app.use(express.json());
const DB_URL = process.env.DB_URL;
io.on('connection',(scoket:Socket)=>{
  handleConnection(io,scoket)
})
const start = async () => {
  const db = await mongoose.connect(DB_URL);
  httpServer.listen(PORT, () => {
    console.log(`server has started at port ${PORT}`);
  });
};

start();

export default app;
