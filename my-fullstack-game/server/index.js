const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const path = require('path');

app.use(cors());
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'react', 'dist')))
const players = {};

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST']
  }
});

// Handle connections
const playersInLobby = {}; // Example: { lobby1: ['Edde'], lobby2: [] }

io.on("connection", (socket) => {
  socket.on("join-lobby", ({ nickname, lobby }) => {
    socket.join(lobby); // Join the socket.io room
    socket.lobby = lobby;
    socket.nickname = nickname;

    if (!playersInLobby[lobby]) playersInLobby[lobby] = [];
    playersInLobby[lobby].push(nickname);

    io.to(lobby).emit("player-list", playersInLobby[lobby]);

    socket.on("disconnect", () => {
      if (playersInLobby[socket.lobby]) {
        playersInLobby[socket.lobby] = playersInLobby[socket.lobby].filter(
          (name) => name !== socket.nickname
        );
        io.to(socket.lobby).emit("player-list", playersInLobby[socket.lobby]);
      }
    });
  });

  socket.on("get-player-list", (lobby) => {
    if (playersInLobby[lobby]) {
      socket.emit("player-list", playersInLobby[lobby]);
    }
  });
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong from backend!' });
});


server.listen(3001, () => {
  console.log(`Server listening on http://localhost:3001`);
});

