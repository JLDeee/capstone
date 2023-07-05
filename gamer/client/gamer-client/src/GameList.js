import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


function GameList() {
    const [games, setGames] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const url = "http://localhost:8080/game";

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
            setGames(data);
            console.log(data)
        }) 
        .catch(console.log);
    }, []);

    const handleDelete = (gameId) => {
        const gameToDelete = games.find(game => game.gameId === gameId);
        if(window.confirm(`Delete ${gameToDelete.gameTitle} from the game list?`)) {
            const init = {
                method: "DELETE"
            };
            fetch(`${url}/${gameId}`, init)
            .then(response => {
                if (response.status === 204) {
                    const newGames = games.filter(game => game.gameId !== gameId);
                    setGames(newGames);
                    navigate("/success", {state: {message: `The game ${gameToDelete.gameTitle} was was deleted.`}});
                } else {
                    return Promise.reject(`${response.status}: It's possible this game is being used somewhere! Delete failed.`);
                }
            })
            .catch(data => setErrors(data));
        }
    }

    return (
        <div>
        <p>Here's what our users are talking about!</p>

        {errors.length > 0 && (
            <div className="alert alert-danger">
                <p>The following errors were found:</p>
                <ul>
                    {errors}
                </ul>
            </div>
        )}

        <table>
            <thead>
                <tr>
                    <th>Game Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {games.map(game => (
                <tr key = {game.gameId}>
                    <td>{game.gameTitle} </td>
                    <td><button onClick={() => handleDelete(game.gameId)}>Delete Game</button></td>
                </tr>
                ))}
            </tbody>
        </table>

    </div>
    )
}

export default GameList;
