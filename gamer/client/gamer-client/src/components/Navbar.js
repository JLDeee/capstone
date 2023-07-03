import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Navbar(){
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        auth.logout();
        console.log("wheee logging out");
        navigate("/success", {state: {message: "You are now logged out."}});
    }

    return(<>
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/duo'}>Duo</Link>
            <Link to={'/community'}>Community</Link>
            {/* {auth.user && <Link to={'/community'}>Community</Link>}             */}
            {!auth.user && <Link to={'/login'}>Log In</Link>}
            {auth.user && <button type="button" onClick={handleLogOut}>Log Out</button>}
        </nav>
    </>)
}

export default Navbar;