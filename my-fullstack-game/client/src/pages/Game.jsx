import { useEffect, useState } from "react";
import { socket } from "../socket";
import { usePlayer } from "../components/PlayerContext";

export default function Game() {
  const { nickname, lobby } = usePlayer();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const handlePlayerList = (updatedPlayers) => {
      console.log("Received player list in game:", updatedPlayers);
      setPlayers(updatedPlayers);
    };

    socket.on("player-list", handlePlayerList);
    socket.emit("get-player-list", lobby);

    return () => {
      socket.off("player-list", handlePlayerList);
    };
  }, [lobby, nickname]);

  return (
    <div>
      <h1>Game</h1>
      <p>Nickname: {nickname}</p>
      <p>Lobby: {lobby}</p>

      <h2>Players in this lobby:</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}