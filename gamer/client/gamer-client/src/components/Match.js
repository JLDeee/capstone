<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

function Match() {
     //State Variables 
     const [youMatched, setYouMatched] = useState([]);
     //const [currentView, setCurrentView] = useState('List');
     const url = 'http://acnhapi.com/v1a/art'
    //  const navigate = useNavigate();
    
     useEffect( () =>{
         fetch(url)
         .then(response => {
             if(response.status === 200) {
                 return response.json();
             } else {
                 return Promise.reject(`Unexpected status code: ${response.status}`);
             }
         })
         .then(data => setYouMatched(data)) //here we are setting our data to our state variable
     }, []); //empty dependency array tells react to run once when the component is initially loaded
     
     console.log(youMatched);
 



    return(

        <section className="container">
            <h1 className="youMatchedHeader">Gamers You've Liked</h1>

            <div className="youMatchedList">
                    {youMatched.map(youMatch =>(
                        <tr key={youMatch.gamer_sender_id}>
                        <td>
                            <Link to={`/match/${youMatch.gamer_1}`}/>
                            <p>{youMatch.gamer_1}</p>
                        </td>
                    </tr>
                    ))}
            </div>
        </section>

    );
=======
import { useEffect, useState } from "react";

function Match() {
    const [gamer, setGamer] = useState({});
    const gamer_url = 'http://localhost:8080/gamer'

    useEffect(() => {
        fetch(gamer_url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
            }
        })
        .then(data => setGamer(data)) 
        .catch(console.log);
    }, []);


    return(
        <section className="match">
            <div className="games-they-play">
                {/* populate this player's games */}
                <ul>
                    {/* {games.map((game, index) => (
                        <li>{game.gameTitle}</li>
                    ))} */}
                    
                    <li>Game #2</li>
                    <li>Game #3</li>
                    <li>Game #4</li>
                    <li>Game #5</li>
                </ul>
            </div>
            <div className="match-card">
                <h2>{gamer.gamerTag}</h2>
                {/* import profile image */}
                <img width="300" className="homePic" src="https://images.unsplash.com/photo-1628501899963-43bb8e2423e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGdhbWVyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                {/* populate user's bio */}
                <p>Model Final Fantasy Magic Points (MP) Red Dead Redemption action Dark Souls tank first-person map game port GG ez cheat Point-and-click. Sidescroller shovelware loot system Pwn Frogger mod quest Dreamcast NPC Tekken KDR adventure game. RQ multi-tap Game Boy Advance Super Mario Odyssey PlayStation Vita PlayStation3 One-shot-kill. Turbo smurf aimbot God Mode Third-Person metroidvania tryhard shoulder buttons. Battle pass nerf screen-peeking The Oregon Trail beta horde mode checkpoint first-person gank Ratchet & Clank OST Beat 'em up. Beat 'Em Up sandbox assist aiming down sights backward compatible emulator nerf. OHKO AFK Rush VAC job Kingdom Hearts easter eggs.</p>
            </div>
            <div className="user-info">
                <ul>
                    <li>{gamer.birthDate}</li>
                    <li>{gamer.genderType}</li>

                    <li>User Age</li>
                    <li>Gender</li>
                </ul>
            </div>
        </section>);
>>>>>>> 667f2e7b4d1e990fe8e5820a1d8452d715ddf60d
}

export default Match;