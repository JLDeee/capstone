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
            <div>
                {auth.user.username && 
                    (<p>Welcome, {auth.user.username}</p>)}
                {auth.userGamer.gamerTag && 
                    (<p>GAMERTAG: {auth.userGamer.gamerTag}</p>)}
                {(!auth.userGamer.gamerTag && auth.user.username) && 
                    (<p>CREATE YOUR PROFILE NOWWW</p>)}
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/duo'}>Duo</Link>
                <Link to={'/community'}>Community</Link>
                {(auth.userGamer.gamerTag && auth.user.username) &&
                    (<Link to={'/profile'}>My Profile</Link>)}
                {(!auth.userGamer.gamerTag && auth.user.username) && 
                    (<Link to={'/profile/form'}>Create Profile</Link>)}

                {(auth.user.username) &&
                    (<Link to={'/gamers'}>Gamers List</Link>)}

                {/* {auth.user.username && <Link to={'/community'}>Community</Link>}             */}
                {!auth.user.username && <Link to={'/login'}>Log In</Link>}
                {auth.user.username && <button type="button" onClick={handleLogOut}>Log Out</button>}
                <button type="button" onClick={handleLogOut}>Emergency Log Out</button>
            </div>
        </nav>
    </>)
}

export default Navbar;