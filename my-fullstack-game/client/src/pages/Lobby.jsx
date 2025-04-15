import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../socket"; // Import the socket instance

const Lobby = () => {
  const [players, setPlayers] = useState({});
  const location = useLocation();
  const nickname = location.state?.nickname;

  useEffect(() => {
    if (nickname) {
      socket.emit("join-lobby", nickname);
    }

    socket.on("player-list", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.off("player-list");
    };
  }, [nickname]);

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