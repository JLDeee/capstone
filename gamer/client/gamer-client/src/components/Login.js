import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState([]);
    const url = "http://localhost:8080";
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const nextCredentials = {...credentials};
        nextCredentials[event.target.name] = event.target.value;
        setCredentials(nextCredentials);
        // for bugtesting
        console.log(nextCredentials);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("yay");
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials),
        }

        fetch(`${url}/authenticate`, init)
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                return response.json();
            } else { 
                return Promise.reject(`${response.status}: Bad credentials! Login failed.`);
            } 
        })
        .then(data => {
            console.log(data.jwt_token);
            const jwtToken = data.jwt_token;
            const decoded = jwtDecode(jwtToken);
            console.log(decoded);
            auth.login(jwtToken);
            navigate("/success", {state: {message: `You are now logged in as ${credentials.username}.`}});

        })
        .catch(data => setErrors(data));
    }

    return (
        // container class is for if we use bootstrap. remember to remove bootstrap classes if we're not using them
        <main className="container">
            <section id="loginContainer">
                <h2>Log In</h2>
                <p>Don't have an account?</p>
                <Link to="/sign-up"><button className="button" type="button">Sign up!</button></Link>
                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <p>The following errors were found:</p>
                        {/* <ul>
                            {errors.map(error => 
                            <li key={error}>{error}</li>
                            )}
                        </ul> */}
                        <p>{errors}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input id="username" 
                        name="username" 
                        type="text" 
                        className="form-control" 
                        onChange={handleChange}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input id="password" 
                        name="password" 
                        type="password" 
                        className="form-control"
                        onChange={handleChange}/>
                    </fieldset>
                    <div className="centerButtonDiv">
                        <button className="button" type="submit">
                            Login
                        </button>
                        {/* <Link className="button" type="button" to={"/"}>
                            Cancel
                        </Link> */}
                        <Link to={"/"}>
                            <button className="button" type="button">
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Login;