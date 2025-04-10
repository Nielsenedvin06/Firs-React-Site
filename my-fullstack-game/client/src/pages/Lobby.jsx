import { useEffect, useState } from 'react';

function Lobby(){
    const [nickname, setNickname] = useState('')

    useEffect(()=>{
        const name = localStorage.getItem('nickname');
        setNickname(name || 'Unknown Player')
    },[]);

    return (
        <div style={{ padding:'2rem'}}>
            <h2>Lobby</h2>
            <p>Welcome, <strong>{nickname}</strong>! Waiting for players...</p>
        </div>
    )
}

export default Lobby;