import React from "react";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import FindGamer from "./FindGamer";

const SpecificPosts = ({ currentGameId }) => {
    const [posts, setPosts] = useState([]);
    
    const [gamers, setGamers] = useState([]);
    const post_url = 'http://localhost:8080/posting'
    
    const gamer_url = 'http://localhost:8080/gamer'


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


let specificPosts = posts.map(post => {
    // need to grab posts from current game (using game id passed in as prop)
    //i want to return only the posts whose game id matches the prop being passed in
    for (let i = 0; i < posts.length; i++) {
        if(post.gameId === currentGameId) {
            return post
            //should return multiple posts
        }
    }
    
})

// let game = games.map(game => {
//     //need to grab current game (using game id passed in as prop)
//     if(game.gameId === currentGameId) {
//         return game
//         //should return one game
//     }
// })

// let gamer = gamers.map(gamer => {
//     //need to grab current gamer from post 
//     for (let i = 0; i < posts.length; i++) {
//         if (post.gamerId === gamer.gamerId) {
//             return gamer
//             //should return one gamer
//         }
//     }
// })


    return(

            // <div className="post">
            //     <div key={}>
            //         <h3 className="postTitle">{posts.map(post => {return post.header})}</h3>
            //         <p className="postDate">{posts.map(post => {return post.datePosted})}</p>
                    
            //         <p className="postGame">{games.map(game => {return game.gameTitle})}</p>
            //         <p className="postGamer">{gamers.map(gamer => {return gamer.gamerTag})}</p>
            //     </div>
            // </div>
        
        <div className="post">
            {posts.map((post, index) => (
                <div key={index}>
                    <h3 className="postTitle">{post.header}</h3>
                    <p className="postDate">{post.datePosted}</p>

                    {/* <p className="postGame"><FindGameTitle/></p> */}
                    <FindGamer currentGamerId={post.gamerId}/>
                </div>
            ))}
             {/* {games.map((game, index) => (
                <div key={index}>
                    <p className="postGame">{game.gameTitle}</p>
                </div>
            ))}
            {gamers.map((gamer, index) => (
                <div key={index}>
                    <p className="postGamer">{gamer.gamerTag}</p>
                </div>
            ))}  */}
         </div>
    );
}

export default SpecificPosts;