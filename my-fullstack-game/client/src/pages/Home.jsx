import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

function Home() {
  const [nickname, setNickname] = useState('');
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('lobby_players', (playerList) => {
      setPlayers(playerList);
    });

    return () => {
      socket.off('lobby_players');
    };
  }, []);

  const handleJoin = () => {
    if (nickname.trim() === '') return;
    socket.emit('join_lobby', nickname);
    
  };

  return (
    <div className="lobby">
      <h2>Join the Game Lobby</h2>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>

      <h3>Players in Lobby:</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;