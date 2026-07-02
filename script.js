import { io } from 'https://cdn.socket.io/4.8.3/socket.io.esm.min.js';
const msgContainer = document.querySelector('.message-container');
const msgForm = document.querySelector('#send-container');
const msgInput = document.querySelector('#msg-input');
const username = window.prompt('Enter Your Username:');
const client = io('http://192.168.1.104:80');
appendMsg(`You joined as ${username}`);
client.on('chat-msg', data=>{
  appendMsg(`${data.sender}:${data.msg}`);
});
client.on('user-connected', username =>{
  appendMsg(`${username} Joined`);
});
client.emit('new-user', username);
msgForm.addEventListener('submit', e =>{
  e.preventDefault();
  const msg = msgInput.value;
  appendMsg(`You: ${msg}`);
  if(msg !== ''){
    client.emit('send-msg', msg);
    msgInput.value = '';
  }
})
function appendMsg(msg, sender){
  const msgElm = document.createElement('div');
  msgElm.innerText = msg;  
  msgContainer.append(msgElm);
}