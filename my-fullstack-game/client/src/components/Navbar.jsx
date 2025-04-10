import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ padding: '1rem', background: '#eee' }}>
            <Link to="/" style={{ marginRight: '1rem'}}>Home</Link>
            <Link to="/lobby" style={{ marginRight: '1rem'}}>Lobby</Link>
            <Link to="/game">Game</Link>
        </nav>
    )
}

export default Navbar;