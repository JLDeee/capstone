import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function GamerList() {
    const [gamers, setGamers] = useState([]);
    const url = "http://localhost:8080/gamer";
    const navigate = useNavigate();

    useEffect( () => {
        fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
            }
        })
        .then(data => {
            setGamers(data);
            console.log(data)
        }) 
        .catch(console.log);
    }, []);

    console.log(gamers);

    return (
        <main className="container">
            <section id="gamersList">
                <h2>Gamers List</h2>

                {/* ok i assume we still want the trading card album stuff */}
                <div className="cardList">
                    {gamers.map(gamer => (
                        <div className="cardProfile" key={gamers.gamerId}>
                            <p>* beginning of card*</p>
                            <p>ID: {gamer.gamerTag}</p>
                            {/* i assume an image goes here */}
                            <p>GENDER: {gamer.genderType}</p>
                            <p>BDAY: {gamer.birthDate}</p>
                            <p>BIO: {gamer.bio}</p>
                            <p>FAV GAMES: </p>
                            <ul>
                                {gamer.games.map(game => {
                                    <li>{game.gameTitle}</li>
                                })}
                            </ul>
                            <p>* end of card *</p>
                        </div>
                    ))}
                    
                </div>

            </section>
        </main>
    )
}

export default GamerList;