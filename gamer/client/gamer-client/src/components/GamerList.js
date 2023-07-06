import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FindPostsByGamer from "./FindPostsByGamer";
import GGIconDuo from "../images/gg_icon_duo.png";
import GGProfileIcon from "../images/gg_profile_icon.png";


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
                <div className="ggIcon">
                        <img src={GGIconDuo} alt="A graphic showing two cartoonish people talking"/>
                        <h2>Gamers List</h2>
                </div>

                {/* ok i assume we still want the trading card album stuff */}
                <div className="cardList">
                    {gamers.map(gamer => (
                        <div className="cardProfile" key={gamer.gamerId}>
                            <div className="apartDiv">
                                <p>GT: <strong>{gamer.gamerTag}</strong></p>
                                <p>ID: {gamer.gamerId}</p>
                            </div>
                            <p><img src={GGProfileIcon} alt="A default profile image"/></p>

                            <div className="apartDiv">
                                <p>GENDER:</p>
                                <p>{gamer.genderType}</p>
                            </div>
                            <div className="apartDiv">
                                <p>BDAY:</p>
                                <p>{gamer.birthDate}</p>
                            </div>
                            <p>BIO: <br/>{gamer.bio}</p>
                            {/* <FindPostsByGamer currentGamerTag={gamer.gamerTag}/> */}
                            <p><Link to={`/profile/${gamer.gamerId}`}>
                                <button className="button" type="button">View Profile</button></Link></p>

                        </div>
                    ))}
                    
                </div>

            </section>
        </main>
    )
}

export default GamerList;