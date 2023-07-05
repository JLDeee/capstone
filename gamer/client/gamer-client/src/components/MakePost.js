import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import { Link, useNavigate, } from 'react-router-dom';
import AuthContext from "../context/AuthContext";


const today = new Date();
// const date = today.setDate(today.getDate());
const defaultValue = today.toISOString().split('T')[0] // yyyy-mm-dd

const POST_DEFAULT = {
    header: '',
    description: '',
    datePosted: defaultValue,
    gameId: '',
    gamerId: 0
}

const MakePost = () => {
    const [errors, setErrors] = useState([]);
    const [post, setPost] = useState(POST_DEFAULT);
    const post_url = 'http://localhost:8080/posting'
    // const { id } = useParams();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    if (auth.userGamer) {
        POST_DEFAULT.gamerId = auth.userGamer.gamerId
    }
    

    

    // useEffect(() => {
    //     // if(id) {
    //         fetch(post_url)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 return response.json();
    //             } else {
    //                 return Promise.reject(`Unexpected status code: ${response.status}`);
    //             }
    //         })
    //         .then(data => setPost(data)) // here we are setting our data to our state variable 
    //         .catch(console.log);
    //     // }
        
    // }, []); 

    // console.log(post);

    // games fetch
    const [games, setGames] = useState([]);
    const game_url = 'http://localhost:8080/game'

    useEffect(() => {
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
    
    }, []);

    const handlePostChange = (event) => {
        // make a copy of the object 
        const newPost = { ...post };
        // update the value of the property changed 
        newPost[event.target.name] = event.target.value;
        // set the state 
        setPost(newPost);
    }


    const handlePostSubmit = (event) => {
        event.preventDefault();
            addPost();
    }


    const addPost = () => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        };
    
        fetch(post_url, init)
        .then(response => {
            if(response.status === 201 || response.status === 400){
                return response.json();
            }else{
                return Promise.reject(`Unexpected status code: ${response.status}`);
            }
        })
        .then(data =>{
            if(data.postingId){
                navigate('/community');
            }else{
                setErrors(data);
            }
        })
        .catch(console.log)
    }

    

    return(
            <section className="make-post">
                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <p>The following errors were found:</p>
                        <ul>
                            {errors.map(error =>
                                <li key={error}>{error}</li>
                            )}
                        </ul>
                    </div>
                )}
                <form onSubmit={handlePostSubmit} id="postForm">
                    <input id="dateRequired" 
                        type="date" 
                        name="dateRequired"
                        readOnly={true} 
                        value={post.datePosted}
                        defaultValue={defaultValue} />
                    <input id="gamerId" 
                        type="text" 
                        name="gamerId"
                        readOnly={true} 
                        value={auth.userGamer.gamerId}
                        defaultValue={defaultValue} />
                    <fieldset className="form-group">
                        <label htmlFor="header">Subject:</label>
                        <input id="header" 
                            name="header" 
                            type="text" 
                            className="form-control"
                            value={post.header}
                            onChange={handlePostChange}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input id="description" 
                            name="description" 
                            type="text" 
                            className="form-control"
                            value={post.description}
                            onChange={handlePostChange}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="gameId">Game:</label>
                        <input id="gameId" 
                            name="gameId" 
                            type="search"
                            placeholder="Search for a game…" 
                            className="form-control"
                            list="games"
                            value={post.gameId}
                            onChange={handlePostChange}/>
                    </fieldset>
                    <datalist id="games">
                        {games.map((game) => (
                            <option value={game.gameId}>{game.gameTitle}</option>
                        ))}
                    </datalist>
                    <div className="mt-4">
                        <button className="btn btn-success submitForm" type="submit" id="postFormSubmitButton"><i className="bi bi-file-earmark-check"></i>Add Post</button>
                        <Link to={"/community"}><button className="btn btn-danger cancelSubmit" type="button"><i className="bi bi-stoplights"></i>Cancel</button></Link>
                </div>
                </form>
            </section>
    );
}

export default MakePost;