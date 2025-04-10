import {useState} from 'react';
import {useNavigate} from 'react-router-dom'

function Home() {
    const [nickname, setNickname] = useState('')
    const navigate = useNavigate();

    const handleJoin = () =>{
        if (nickname.trim() === '') return alert('Please enter a nickname');
        localStorage.setItem('nickname',nickname);
        navigate('/lobby');
    ;}

    return (
        <div style={{padding: '2rem'}}>
            <h2>Welcome to the Game!!</h2>
            <input 
            type="text" 
            placeholder="Enter your nickname" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            style={{marginRight:'1rem'}} id="" 
            />
            <button onClick={handleJoin}>Join Lobby</button>
        </div>
    )
}

export default Home;