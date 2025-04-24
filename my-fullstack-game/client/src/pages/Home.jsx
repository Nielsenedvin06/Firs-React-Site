import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { socket } from "../socket";
import { usePlayer } from "../components/PlayerContext";

export default function Home() {
  const { setNickname, setLobby } = usePlayer();
  const [inputNickname, setInputNickname] = useState("");
  const [selectedLobby, setSelectedLobby] = useState("lobby1");
  const navigate = useNavigate();

  const handleJoin = () => {
    setNickname(inputNickname);
    setLobby(selectedLobby);

    socket.emit("join-lobby", { nickname: inputNickname, lobby: selectedLobby });
    navigate("/lobby");
  };

  return (
    <div>
      <h1>Join Game</h1>
      <input
        type="text"
        placeholder="Nickname"
        value={inputNickname}
        onChange={(e) => setInputNickname(e.target.value)}
      />
      <select value={selectedLobby} onChange={(e) => setSelectedLobby(e.target.value)}>
        <option value="lobby1">Lobby 1</option>
        <option value="lobby2">Lobby 2</option>
      </select>
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}