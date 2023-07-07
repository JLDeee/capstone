import React, { useContext } from "react";
import { useEffect, useState } from "react";
import FindGamer from "./FindGamer";
import FindGameTitle from "./FindGameTitle";
import Searchbar from "./Searchbar";
import { useParams} from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import GGIconCommunity from "../../images/gg_icon_community.png";


const Post = () => {
    const [post, setPost] = useState({});
    const post_url = 'http://localhost:8080/posting'
    const { id } = useParams();
    const [results, setResults] = useState([]);
    const [active, setActive] = useState(false);
    const [currentGameId, setCurrentGameId] = useState([]);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    function hideResults() {
        let x = document.getElementById("results")
        x.style.display = "none";
    }

    function clearSearch() {
        let x = document.getElementById("results")
        x.style.display = "none";
        
    }


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
    }, [id]); 

    console.log(id);

    const handleDeletePost = () => {
        if(window.confirm(`Delete post from date ${post.datePosted}`)){
            const init = {
                method: 'DELETE'
            };
        fetch(`${post_url}/${post.postingId}`, init)
        .then(response =>{
            if(response.status === 204){
                navigate('/community');
            }else{
                return Promise.reject(`Unexpected Status code: ${response.status}`);
            }
        })
        .catch(console.log)
        }
    }


    return(
        <main className="container">
        <section className="postSection">
            {/* <div>
                <Searchbar setResults={setResults}/>
            </div>
            <div id="results">
                {results.map((result, gameId) => {
                        return <div key={gameId} onClick={() => {
                            {setCurrentGameId(result.gameId)}; 
                            {setActive(true)}; 
                            {hideResults()}; 
                            {clearSearch()}}}>
                        {result.gameTitle}</div> 
                })}
                {console.log(currentGameId)}
            </div> */}
            <div className="ggIcon">
                <img src={GGIconCommunity} alt="A graphic showing a speech bubble"/>
                <h2>Post</h2>
            </div>
            <div className="post">
                <div key={post.postingId}>
                    <h3 className="postTitle">{post.header}</h3>
                    <p className="postDate">POSTED: {post.datePosted}</p>
                    <FindGameTitle currentGameId={post.gameId}/>
                    <Link to={`/profile/${post.gamerId}`}>
                    <FindGamer currentGamerId={post.gamerId}/>
                    </Link>
                    <p className="description">{post.description}</p>
            </div>

            </div>
            {auth.userGamer.gamerId == post.gamerId ? (
                <div className="centerButtonDiv">
                    <Link to={`/post/${post.postingId}/edit/`}>
                    <button className="button " >
                        Edit Post</button>
                    </Link>
                    <button className="button" onClick={() => handleDeletePost(post.postingId)}>
                        Delete Post
                    </button>
                </div>
            ) : ("")}
            <div className="centerButtonDiv"><Link to="/community">
                <button className="button">Community
                </button>
                </Link>
            </div>
        </section>
        </main>
    );
}

export default Post;