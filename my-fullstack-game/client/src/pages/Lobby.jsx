import { useEffect, useState } from 'react';
import socket from '../socket';

function Lobby() {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('nickname');
    setNickname(name || 'Unknown Player');

    if (name) {
      socket.emit('join_lobby', name);
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lobby</h2>
      <p>Welcome, <strong>{nickname}</strong>! Waiting for more players...</p>
    </div>
  );
}

export default Lobby;