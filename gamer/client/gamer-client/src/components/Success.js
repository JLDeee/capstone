import { Link, useLocation } from "react-router-dom";

function Success(){
    const location = useLocation();

    return(
    <main>
        <h2>Success!</h2>
        <p>{ location.state ? `${location.state.message}` : ""}</p>
        <Link to="/">
            Home
        </Link>
        <Link to="/profile">Profile</Link>
    </main>
    )
}

export default Success;