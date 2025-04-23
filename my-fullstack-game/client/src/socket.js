import { io } from 'socket.io-client';

const socket = io({
  autoConnect: false,
});

socket.on('connect', () => {
  console.log('Connected to server with id:', socket.id);
});

export default socket;
