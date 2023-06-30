import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";

function GamerProfile() {

    const GAMER_PROFILE_BLANK = {
        gamerId:"999",
        genderType:"PREFER_NOT_TO_SAY",
        gamerTag:"GamerTag",
        birthDate:"2000-01-01",
        bio:"InsertBioHere",
    }
    const [gamer, setGamer] = useState(GAMER_PROFILE_BLANK);
    const auth = useContext(AuthContext);
    const { id } = useParams();
    const url = "http://localhost:8080/gamer";

    // get user profile information
    useEffect( () => {
        if (id) {
            fetch(`${url}/${id}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then( data => {
                setGamer(data);
            })
            .catch(console.log);
        }
    }, []);

    return(
        <>
        <main className="container">
            <section className="gamerProfileInfo">
                <h2>{gamer.gamerTag}'s Profile</h2>
                <div>
                    <p>Gamer ID: {gamer.gamerId}</p>
                    <p>Gender: {gamer.genderType}</p>
                    <p>birthDate: {gamer.birthDate}</p>
                    <p>About me: {gamer.bio}</p>
                </div>
                <div>
                    <Link to="/profile/{id}/form" className="btn btn-success mr-2" type="button">
                        Edit
                    </Link>
                </div>
            </section>
        </main>
        </>
    );
}

export default GamerProfile;