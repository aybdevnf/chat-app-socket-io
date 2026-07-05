import {Server as socket} from 'socket.io';
const server = new socket(process.env.PORT,{
  cors:{
    origin:"*"
  }
});
const users = {};
server.on('connection',(socket)=>{
  console.log(`[+] NEW-USER: ${socket.id} [IP] ${socket.handshake.address}`);
  socket.on('send-msg',msg=>{
    socket.broadcast.emit('chat-msg',{msg:msg, sender:users[socket.id]});
  })
  socket.on('new-user',(username)=>{
    users[socket.id] = username;
    socket.broadcast.emit('user-connected', username);
  })
});