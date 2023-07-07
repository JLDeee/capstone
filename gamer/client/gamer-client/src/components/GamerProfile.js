import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import FindPostsByGamer from "./FindPostsByGamer";

import GGIconProfile from "../images/gg_icon_profile.png";
import GGProfileIcon from "../images/gg_profile_icon.png";


import GGSentYes from "../images/gg_gg_hover.png";
import GGSentNo from "../images/gg_gg.png";


function GamerProfile() {
    const auth = useContext(AuthContext);
    
    const BLANK_GAMER_PROFILE = {
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
    };
    const [gamer, setGamer] = useState(BLANK_GAMER_PROFILE);
    
    const today = new Date();
    const adjustedTodayForTimezome = new Date(today.getTime() - today.getTimezoneOffset() * 60000);

    console.log(adjustedTodayForTimezome);
    const BLANK_MATCH_TO_SEND = {
        dateMatchSent: adjustedTodayForTimezome.toISOString().split("T")[0],
        gamerSenderId: auth.userGamer.gamerId,
        gamerReceiver: gamer
    };
    const [match, setMatch] = useState(BLANK_MATCH_TO_SEND);
    const [errors, setErrors] = useState([]);

    console.log(match.dateMatchSent);

    let { id } = useParams();
    const navigate = useNavigate();
    const url = "http://localhost:8080/gamer";

    // get user profile information
    useEffect( () => {
        console.log(`You refreshed the page probably. here's the id: ${id}`);
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
    }, [id]); 

    const handleAddMatch = () => {
        console.log("this gamer will be added to the match:");
        console.log(gamer);
        const newMatch = {...match};
        newMatch.gamerReceiver = gamer;
        console.log("this is the match:");
        console.log(newMatch);
    
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMatch)
        }
        fetch(`${url}/match`, init)
        .then(response => {
            if (response.status === 201) {
                console.log("Success! Match was added!");
                return null;
            } else if (response.status === 400) {
                console.log("Oops, something went wrong...");
                return response.json();
            } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
            }
        })
        .then (data => {
            if (!data) {
                console.log("Now redirecting...");
                navigate("/success", {state: {message: `You, ${auth.userGamer.gamerTag}, successfully GG'd ${gamer.gamerTag}!`}});
            } else {
                setErrors(data);
            }
        })
        .catch(console.log);
    }

    
    const handleRemoveMatch = () => {
        console.log(gamer.gamerId);
        console.log(auth.userGamer.gamerId);
        console.log("removing match!");
        const init = {
            method: 'DELETE'
        };
        fetch(`${url}/match/${gamer.gamerId}/${auth.userGamer.gamerId}`, init)
        .then(response => {
            if (response.status === 204) {
                navigate("/success", {state: {message:  `You, ${auth.userGamer.gamerTag}, took back your GG for ${gamer.gamerTag}.`}});
            } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
            }
        })
        .catch(console.log);
    }
    console.log(auth.userGamer.sentMatches.filter(match => match.gamerReceiver.gamerId === gamer.gamerId).length > 0);

    return(
        <>
        <main className="container">
            <section id="gamerProfileContainer">
                <div className="ggIcon">
                    <img src={GGIconProfile} alt="A graphic showing a card and some video game console buttons"/>
                    <h2>{gamer.gamerTag}'s Profile</h2>
                </div>
                <div className="cardProfile">
                    <div className="apartDiv">
                        <p>GT: <strong>{gamer.gamerTag}</strong></p>
                        <p>ID: {gamer.gamerId}</p>
                    </div>
                    <p>
                        <img src={GGProfileIcon} alt="A default profile image"/>
                    </p>
                    <div className="apartDiv">
                        <p>GENDER:</p>
                        <p>{gamer.genderType}</p>
                    </div>
                    <div className="apartDiv">
                        <p>BDAY:</p>
                        <p>{gamer.birthDate}</p>
                    </div>
                    <p>BIO: <br/>{gamer.bio}</p>
                    <p>FAV GAMES:</p>
                    <ul>
                        {(gamer.games.length > 0) ? (gamer.games.map(game => 
                            <li key={game.game.gameId}>{game.game.gameTitle}</li>
                        )) : (
                            <p>None yet!</p>
                        )}
                    </ul>
                    <p>SENT GG's FOR:</p>
                    <ul>
                        {(gamer.sentMatches.length > 0) ? (gamer.sentMatches.map(match => 
                            <li key={match.gamerReceiver.gamerId}>
                                <Link to={`/profile/${match.gamerReceiver.gamerId}`}>{match.gamerReceiver.gamerTag}</Link> at {match.dateMatchSent}
                            </li>
                        )) : (
                            <p>None yet!</p>
                        )}
                    </ul>
                    <p>GOT GG'd BY:</p>
                    <ul>
                        {(gamer.receivedMatches.length > 0) ? (gamer.receivedMatches.map(match => 
                            <li key={match.gamerSender.gamerId}>
                                <Link to={`/profile/${match.gamerSender.gamerId}`}>{match.gamerSender.gamerTag}</Link> at {match.dateMatchReceived}
                            </li>
                        )) : (
                            <p>None yet!</p>
                        )}
                    </ul>
                    <ul><FindPostsByGamer currentGamerTag={gamer.gamerTag}/></ul>
                </div>
                <div>
                    {/* <p>TODO: make this link only appear if this is YOUR profile</p> */}
                    {auth.userGamer.gamerId === gamer.gamerId ? 
                        (<div className="centerButtonDiv">
                            <Link to={`/profile/${gamer.gamerId}/form`}>
                                <button className="button" type="button">
                                Edit Profile</button>
                            </Link>
                            <Link to={`/profile/game`}>
                                <button className="button" type="button">
                                Edit Fav Games</button>
                            </Link>
                        </div>) : ("")}
                    {/* <p>TODO: make this button only appear if this is someone ELSE'S profile</p> */}
                    
                    {(auth.userGamer.gamerTag) ? (
                        (auth.userGamer.gamerId !== gamer.gamerId) ? (
                            <div>
                                {(gamer.receivedMatches.filter(
                                    match => match.gamerSender.gamerId === auth.userGamer.gamerId).length > 0) ? (
                                        <img className="ggProfile" src={GGSentYes}/>
                                    ) : (
                                        <img className="ggProfile" src={GGSentNo}/>
                                        
                                    )}
                                <div className="centerButtonDiv">
                                    <button className="button" type="button" onClick={handleAddMatch}>Send a GG!</button>
                                    <button className="button" type="button" onClick={handleRemoveMatch}>Remove GG</button>
                                    
                                </div>

                            </div>
                            ) : (
                            "")
                        ) : (
                            <>
                            <div className="alert">Create a profile to send a GG!
                                <div className="centerButtonDiv">
                                    <Link to="/profile/form">
                                        <button className="button" type="button">Create Profile</button></Link>
                                </div>
                            </div>

                        </>)
                    }

                    {errors.length > 0 && (
                        <div className="alert">
                            <p>The following errors were found:</p>
                            <ul>
                                {errors.map(error => 
                                <li key={error}>{error}</li>
                                )}
                            </ul>
                        </div>
                    )}
                    {(auth.userGamer.gamerTag && (auth.userGamer.gamerId !== gamer.gamerId)) && (
                        <div className="centerButtonDiv"><Link to="/message">
                        <button className="button">Send Message (WIP)
                        </button>
                        </Link>
                    </div>
                    )}

                    <div className="centerButtonDiv"><Link to="/gamers">
                        <button className="button">Gamers List
                        </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}

export default GamerProfile;