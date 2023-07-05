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
                {(auth.user.username) && (
                    <li><Link to={'/community'}>Community</Link></li>
                )}
                {(auth.userGamer.gamerTag && auth.user.username) && (
                    <li><Link to={'/profile'}>My Profile</Link></li>
                )}

                {(!auth.userGamer.gamerTag && auth.user.username) && (
                    <li><Link to={'/profile/form'}>Create Profile</Link></li>
                )}

                {(auth.user.username) && (
                    <li><Link to={'/gamers'}>Gamers List</Link></li>)}
                {(auth.userGamer.gamerTag && auth.user.username) && (
                    <li><Link to={'/game'}>Games List</Link></li>)}

                {!auth.user.username && (
                    <li><Link to={'/login'}>Log In</Link></li>)}
                {auth.user.username && (
                    <li><button type="button" onClick={handleLogOut}>
                        Log Out
                    </button></li>)}
                    
                {/* <li><button type="button" onClick={handleLogOut}>Emergency Log Out</button></li>     */}
                <p>{auth.user.username && (`USER: ${auth.user.username} `)}
                    {auth.userGamer.gamerTag && (`/ GT: ${auth.userGamer.gamerTag}`)}
                    {(!auth.userGamer.gamerTag && auth.user.username) && (`(Create your profile!)`)} 
                </p>

                {/* <li>{(!auth.userGamer.gamerTag && auth.user.username) && 
                    (<p>CREATE YOUR PROFILE NOWWW</p>)}</li>     */}
            </ul>
        </nav>
    </>)
}

export default Navbar;