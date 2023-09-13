import { Link, useLocation } from "react-router-dom";

function Success(){
    const location = useLocation();

    return(
    <main className="container">
        <section id="successContainer">
            <h2>Success!</h2>
            <p>{ location.state ? `${location.state.message}` : ""}</p>
        </section>
    </main>
    )
}

export default Success;