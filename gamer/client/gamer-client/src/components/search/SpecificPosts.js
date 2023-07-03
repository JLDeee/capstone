import React from "react";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

const SpecificPosts = ({ currentGame }) => {
    const [posts, setPosts] = useState([]);
    const [games, setGames] = useState([]);
    const [gamers, setGamers] = useState([]);
    const post_url = 'http://localhost:8080/posting'
    const game_url = 'http://localhost:8080/game'
    const gamer_url = 'http://localhost:8080/gamer'
    // let gamePostId = posts.map(post => {
    //     return post.gameId
    // });
    // let gamerPostId = posts.map(post => {
    //     return post.gamerId
    // });
    // let postGame = games.map(game => {
    //     return game[gamePostId].gameTitle
    // })
    // let postGame = games[gamePostId].gameTitle;
    // const { gamePostId } = useParams();

    useEffect(() => {
        fetch(post_url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => setPosts(data)) // here we are setting our data to our state variable 
            .catch(console.log);
    }, []); // empty dependency array tells react to run once when the component is intially loaded

    // let userIndex = users.map((user) => {
    //     return user.id
    // })

    useEffect(() => {
        // if(id) {
            // fetch(`${url2}/${id}`)
            fetch(game_url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => setGames(data)) // here we are setting our data to our state variable 
            .catch(console.log);
        // }
        
    }, []); // empty dependency array tells react to run once when the component is intially loaded

    useEffect(() => {
        fetch(gamer_url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => setGamers(data)) // here we are setting our data to our state variable 
            .catch(console.log);
    }, []); // empty dependency array tells react to run once when the component is intially loaded

    let post = posts.map(post => {
        return post
    });
    let game = games.map(game => {
        return game[currentGame]
    });
    let gamer = gamers.map(gamer => {
        return gamer[currentGame]
    });

    return(

            <div className="post">
                <div>
                    <h3 className="postTitle">{post.header}</h3>
                    <p className="postDate">{post.datePosted}</p>
                    <p className="postGame">{game.gameTitle}</p>
                    <p className="postGamer">{gamer.gamerTag}</p>
                </div>
            </div>
        
        // <div className="post">
        //     {posts.map((post, index) => (
        //         <div key={index}>
        //             <h3 className="postTitle">{post.header}</h3>
        //             <p className="postDate">{post.datePosted}</p>
        //             <p className="postGame">{game.gameTitle}</p>
        //             <p className="postGamer">{gamer.gamerTag}</p>
        //         </div>
        //     ))}
            /* {games.map((game, index) => (
                <div key={index}>
                    <p className="postGame">{game.gameTitle}</p>
                </div>
            ))}
            {gamers.map((gamer, index) => (
                <div key={index}>
                    <p className="postGamer">{gamer.gamerTag}</p>
                </div>
            ))} */
        // </div>
    );
}

export default SpecificPosts;