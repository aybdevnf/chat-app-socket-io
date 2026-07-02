import {Server as socket} from 'socket.io';
const server = new socket(80,{
  cors:{
    origin:"*"
  }
});
const users = {};
server.on('connection',(socket)=>{
  console.log('[+] NEW-USER', socket.id);
  socket.on('send-msg',msg=>{
    socket.broadcast.emit('chat-msg',{msg:msg, sender:users[socket.id]});
  })
  socket.on('new-user',(username)=>{
    users[socket.id] = username;
    socket.broadcast.emit('user-connected', username);
  })
});
