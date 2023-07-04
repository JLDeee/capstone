import React from "react";
import { useEffect, useState } from "react";
import FindGamer from "./FindGamer";
import FindGameTitle from "./FindGameTitle";
import { useParams} from 'react-router-dom';

const Post = () => {
    const [post, setPost] = useState({});
    const post_url = 'http://localhost:8080/posting'
    const { id } = useParams();



    useEffect(() => {
        if(id) {
            fetch(`${post_url}/${id}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => setPost(data)) // here we are setting our data to our state variable 
            .catch(console.log);
        }
        
    }, {id}); 




    return(
        
        <div className="post">
                <div key={post.postingId}>
                    <h3 className="postTitle">{post.header}</h3>
                    <p className="postDate">{post.datePosted}</p>
                    <FindGameTitle currentGameId={post.gameId}/>
                    <FindGamer currentGamerId={post.gamerId}/>
                    <p className="description">{post.description}</p>
                </div>
        </div>
    );
}

export default Post;