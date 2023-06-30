import { Link } from 'react-router-dom';
function Navbar(){
    return(<>
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/duo'}>Duo</Link>
            <Link to={'/community'}>Community</Link>
            <Link to={'/register'}>Sign Up</Link>
            <Link to={'/login'}>Login</Link>
        </nav>
    </>)
}

export default Navbar;