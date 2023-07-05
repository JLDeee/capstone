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
        games: [
            {gamerId:"999",
            game: {
                gameId:"1",
                gameTitle:"Game1"
            }}, 
            {gamerId:"999",
            game: {
                    gameId:"2",
                    gameTitle:"Game2"
            }}
        ],
        sentMatches: [
            {gamerSenderId: "999",
            gamerReceiver: {
                gamerId:"1",
                gamerTag:"sent_to_other1"
            }},
            {gamerSenderId: "999",
                gamerReceiver: {
                gamerId:"2",
                gamerTag:"sent_to_other2"
            }}
        ],
        receivedMatches: [
            {gamerReceiverId: "999",
            gamerSender: {
                gamerId:"1",
                gamerTag:"i_got_this1"
            }},
            {gamerReceiverId: "999",
            gamerSender: {
                gamerId:"2",
                gamerTag:"i_got_this2"
            }}
        ]
    }
    const [gamer, setGamer] = useState(GAMER_PROFILE_BLANK);

    const auth = useContext(AuthContext);
    let { id } = useParams();
    const url = "http://localhost:8080/gamer";

    const today = new Date();
    console.log(today.toISOString().split("T")[0]);

    // get user profile information
    useEffect( () => {
        console.log(`You refreshed the page probably. here's the ${id}`);
        if (!id) {
            console.log(`this should be null if url is /profile : ${id}`);
            console.log(auth.userGamer);
            console.log(`setting new id as ${auth.userGamer.gamerId}`);    
            id = auth.userGamer.gamerId;
        }
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
                console.log(data);
            })
            .catch(console.log);
        }
    }, []);

    const handleAddMatch = () => {
        console.log("adding match!");
        // const init = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: {
        //         'gamerId':'',
        //         'gamerSenderId':'',
        //         'dateMatchSent': 
        //     }
        //     JSON.stringify(solarPanel)
        // }
        // fetch(`${url}/gamer/match`)
        // .then(response => )
    }

    
    const handleRemoveMatch = () => {
        console.log("removing match!");
        // const init = {
        //     method: 'DELETE'
        // };
        // fetch(`${url}/gamer/match/${gamer.gamerId}/${INSERT_MATCH_SENDER_ID_AKA_YOU}`)
        // // .then(response => )
    }

    return(
        <>
        <main className="container">
            <section className="gamerProfileInfo">
                <h2>{gamer.gamerTag}'s Profile</h2>
                <div>
                    <p>ID: {gamer.gamerId}</p>
                    <p>GENDER: {gamer.genderType}</p>
                    <p>BDAY: {gamer.birthDate}</p>
                    <p>BIO: {gamer.bio}</p>
                    <p>FAV GAMES:</p>
                    <ul>
                        {gamer.games.map(game => 
                            <li key={game.game.gameId}>{game.game.gameTitle}</li>
                        )}
                    </ul>
                    <p>GG'd BY:</p>
                    <ul>
                        {gamer.sentMatches.map(match => 
                            <li key={match.gamerReceiver.gamerId}>{match.gamerReceiver.gamerTag} at {match.dateMatchReceived}</li>
                        )}
                    </ul>
                    <p>GG'd BY:</p>
                    <ul>
                        {gamer.receivedMatches.map(match => 
                            <li key={match.gamerSender.gamerId}>{match.gamerSender.gamerTag} at {match.dateMatchReceived}</li>
                        )}
                    </ul>

                </div>
                <div>
                    <p>TODO: make this link only appear if this is YOUR profile</p>
                    {auth.userGamer.gamerId === gamer.gamerId ? 
                        (<Link to={`/profile/${gamer.gamerId}/form`} className="btn btn-success mr-2" type="button">
                            Edit
                        </Link>) : ("CAN'T EDIT")}
                    <p>TODO: make this button only appear if this is someone ELSE'S profile</p>
                    <button onClick={handleAddMatch}>Send a GG!</button>
                    <button onClick={handleRemoveMatch}>Remove GG</button>

                    <p>
                        <Link to="/gamers">Gamers List</Link>
                    </p>
                </div>
            </section>
        </main>
        </>
    );
}

export default GamerProfile;