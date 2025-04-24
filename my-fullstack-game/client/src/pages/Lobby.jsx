import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../components/PlayerContext";

export default function Lobby() {
  const { nickname, lobby } = usePlayer();
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePlayerList = (updatedPlayers) => {
      setPlayers(updatedPlayers);
    };

    socket.on("player-list", handlePlayerList);
    socket.emit("get-player-list", lobby);

    return () => {
      socket.off("player-list", handlePlayerList);
    };
  }, [lobby]);

  const startGame = () => {
    navigate("/game");
  };

  return (
    <div>
      <h1>Lobby: {lobby}</h1>
      <h2>Nickname: {nickname}</h2>
      <h3>Players:</h3>
      <ul>
        {players.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}
