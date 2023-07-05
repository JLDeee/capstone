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
            <ul>
                
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/about'}>About</Link></li>
                <li><Link to={'/duo'}>Duo</Link></li>
                <li><Link to={'/community'}>Community</Link></li>
                <li>{(auth.userGamer.gamerTag && auth.user.username) &&
                    (<Link to={'/profile'}>My Profile</Link>)}</li>
                <li>{(!auth.userGamer.gamerTag && auth.user.username) && 
                    (<Link to={'/profile/form'}>Create Profile</Link>)}</li>

                <li>{(auth.user.username) &&
                    (<Link to={'/gamers'}>Gamers List</Link>)}</li>
                    
                {/* {auth.user.username && <Link to={'/community'}>Community</Link>}*/}
                    <li>{!auth.user.username && <Link to={'/login'}>Log In</Link>}</li>
                    <li>{auth.user.username && <button type="button" onClick={handleLogOut}>Log Out</button>}</li>
                    {/* <li><button type="button" onClick={handleLogOut}>Emergency Log Out</button></li>     */}
                <li>{auth.user.username && 
                    (<p>Welcome, {auth.user.username}</p>)}</li>
                <li>{auth.userGamer.gamerTag && 
                    (<p>GAMERTAG: {auth.userGamer.gamerTag}</p>)}</li>
                <li>{(!auth.userGamer.gamerTag && auth.user.username) && 
                    (<p>CREATE YOUR PROFILE NOWWW</p>)}</li>    
            </ul>
        </nav>
    </>)
}

export default Navbar;