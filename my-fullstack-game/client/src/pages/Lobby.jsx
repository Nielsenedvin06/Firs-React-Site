import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../socket"; // Import the socket instance
import Home from "./Home";

const Lobby = () => {
  const [players, setPlayers] = useState({});
  const location = useLocation();
  const nickname = location.state?.nickname;

  useEffect(() => {
   console.log("Nickname in lobby:", nickname);

  if (nickname) {
    socket.emit("join-lobby", nickname);
  }

  socket.on("player-list", (updatedPlayers) => {
    console.log("Received player list:", updatedPlayers); // ⬅️ key log
    setPlayers(updatedPlayers);
  });

  // Clean up only the listeners, not the whole socket
  return () => {
    socket.off("player-list");
  };
  }, []);

  return (
    <div>
      <h1>Lobby</h1>
      <h2>Players:</h2>
      <ul>
        {Object.entries(players).map(([id, name]) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;