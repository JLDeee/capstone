import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import GGLogo from '../images/gg_logo_chill.png'

function Navbar(){
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        auth.logout();
        console.log("wheee logging out");
        navigate("/success", {state: {message: "You are now logged out."}});
    }

    return(<>
        <nav className='apartDiv'>
        <Link to={'/'}>
            <img src={GGLogo} alt="The Gamers' Guild logo: A 3D cube"/>
        </Link>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                {(!auth.user.username) && (
                    <li><Link to={'/about'}>About</Link></li>)}
                {(!auth.user.username) && (
                    <li><Link to={'/duo'}>GG</Link></li>
                )}

                
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
                    <li><button class="boringButton" type="button" onClick={handleLogOut}>
                        Log Out
                    </button></li>)}

                {(auth.user.username && !auth.userGamer.gamerTag) && (
                    <li>USER:<strong> {auth.user.username}</strong></li>)}
                {auth.userGamer.gamerTag && (
                    <li>GT:<strong> {auth.userGamer.gamerTag}</strong></li>)}
            </ul>
        </nav>
    </>)
}

export default Navbar;