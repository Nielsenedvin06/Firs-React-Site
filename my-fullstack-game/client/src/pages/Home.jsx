import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  socket from '../socket';

function Home() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (nickname.trim() !== "") {
      socket.connect(); // connect manually
      socket.emit("join-lobby", nickname);
      navigate("/lobby", { state: { nickname } });
    }
  };

  return (
    <div>
      <h1>Enter Your Nickname</h1>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
      />
      <button onClick={handleJoin}>Join Lobby</button>
    </div>
  );
};


export default Home;