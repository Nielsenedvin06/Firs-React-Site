const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
const path = require('path');

app.use(cors());
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','client','react','dist')))
const players = {};

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST']
  }
});

// Handle connections
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  
  socket.on("join-lobby", (nickname) => {
    players[socket.id] = nickname;
    console.log("Player joined:", nickname);
    console.log("Players now:", players);
    io.emit("player-list", players); // This should definitely happen
  });
  
    socket.on("disconnect", () => {
      delete players[socket.id];
      io.emit("player-list", players);
    });
  });

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong from backend!' });
});


server.listen(3001, () => {
  console.log(`Server listening on http://localhost:3001`);
});

