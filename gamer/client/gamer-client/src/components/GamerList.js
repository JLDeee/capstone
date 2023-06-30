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
                            <p>{gamer.gamerId}</p>
                            {/* i assume an image goes here */}
                            <p>{gamer.genderType}</p>
                            <p>{gamer.birthDate}</p>
                            <p>{gamer.bio}</p>
                            <p>* end of card *</p>
                        </div>
                    ))}
                    
                </div>

            </section>
        </main>
    )
}

export default GamerList;