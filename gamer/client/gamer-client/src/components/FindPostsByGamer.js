import { useEffect, useState } from "react";

function FindPostByGamer(props) {
    const [posts, setPosts] = useState([]);
    const post_url = 'http://localhost:8080/posting'

    useEffect(() => {
        fetch(`${post_url}/player/${props.currentGamerTag}`)
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
    return(
        <>
        {posts.map(post => {
            <p className="gamer-posts">{post.header}</p>
        })}
        </>
    );
}

export default FindPostByGamer;