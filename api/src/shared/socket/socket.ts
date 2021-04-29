import { io } from '../../server';
//const STATIC_CHANNELS = ['global_notifications', 'global_chat'];

io.on("connection", (socket: any) => {
    console.log("New client connected");
    socket.emit('connection', null);
  });
  io.on("disconnect", (reason: any) => {
    console.log(reason); // "ping timeout"
  });