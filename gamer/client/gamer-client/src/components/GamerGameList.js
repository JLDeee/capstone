import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GameList from "./GameList";
import GGIconGame from "../images/gg_icon_game.png";


function GamerGameList() {
    const auth = useContext(AuthContext);
    const [gamerGames, setGamerGames] = useState([]);
    const [errors, setErrors] = useState([]);
    const url = "http://localhost:8080";
    const navigate = useNavigate();

    useEffect( () => {
        if (auth.userGamer.gamerId) {
            fetch(`${url}/gamer/${auth.userGamer.gamerId}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                setGamerGames(data.games);
                console.log(gamerGames);
            }) 
            .catch(console.log);
        } else if (auth.user.username) {
            navigate("/profile/form");
        } else {
            navigate("/login");
        }
    }, [])

    const handleRemoveGamerGame = (game) => {
        console.log(`removing game ${game.gameTitle}`);
        const init = {
            method: 'DELETE'
        };
        fetch(`${url}/gamer/game/${auth.userGamer.gamerId}/${game.gameId}`, init)
        .then(response => {
            if (response.status === 204) {
                navigate("/success", {state: {message: `You removed ${game.gameTitle} from your fav games.`}});
            } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
            }
        })
        .catch(data => {
            setErrors([data]);
            console.log(data);
        });
    }

    return (<>
        <main className="container">
            <section id="gamerGameListContainer">
            <div className="ggIcon">
                <img src={GGIconGame} alt="A graphic showing a game controller"/>
                <h2>{auth.userGamer.gamerTag}'s Fav Games</h2>

            </div>
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
                {gamerGames.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Game Title</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {gamerGames.map(gamerGame => (
                        <tr key={gamerGame.game.gameId}>
                            <td>{gamerGame.game.gameTitle} </td>
                            <td><button className="button" onClick={() => handleRemoveGamerGame(gamerGame.game)} type="button">Remove Fav</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                ) : (<p>None so far!</p>)}
                </section>        

        </main>
        <GameList isComponent={true} />  
        </>
    );
}

export default GamerGameList;