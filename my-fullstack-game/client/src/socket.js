import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', );

socket.on('connect', () => {
  console.log('Connected to server with id:', socket.id);
});

export default socket