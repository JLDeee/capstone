import Searchbar from "./search/Searchbar";
import SpecificPosts from "./search/SpecificPosts";
import AllPosts from "./search/AllPosts";
import { useState } from "react";
import { Link } from 'react-router-dom';
import GGIconCommunity from "../images/gg_icon_community.png";
import { gsap } from "gsap";
import { useEffect } from "react";

function Community() {

    useEffect(() => {
         
        /*Image Animations*/
        gsap.set(".communityBody", {
            autoAlpha: 0,
            x:1500,
            stagger: 0.5
        })

        gsap.to(".communityBody", {
            duration: 1,
            autoAlpha: 1,
            x: 0
        })

        gsap.set(".communityIcon", {
            autoAlpha: 0,
            y:-400,
        })

        gsap.to(".communityIcon", {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            yoyo: true,
            ease: "bounce.out"
            
        })
    })

    const [results, setResults] = useState([]);
    const [active, setActive] = useState(false);
    const [currentGameId, setCurrentGameId] = useState([]);

    function hideResults() {
        let x = document.getElementById("results")
        x.style.display = "none";
    }

    function clearSearch() {
        let x = document.getElementById("results")
        x.style.display = "none";
    }


    return(
        <main className="container">
        <section className="about">
            <div className="ggIcon">
                <img className="communityIcon" src={GGIconCommunity} alt="A graphic showing a game controller"/>
                <h2>Community</h2>
            </div>
            <div className="centerButtonDiv">
            <Link to={"/make-post"}>
                <button className="button postButton">Make a Post</button>
            </Link>

            </div>
            <div>
                <p>Search posts by game: </p>
                <Searchbar setResults={setResults}/>
            </div>
            <div id="results">
                {
                    results.map((result, gameId) => {
                        return <div key={gameId} onClick={() => {{setCurrentGameId(result.gameId)}; {setActive(true)}; {hideResults()}; {clearSearch()}}}>{result.gameTitle}</div> 
                    })
                }{console.log(currentGameId)}
            </div>

            <div className="communityBody">        

       

            {/* <p className="communityP">In dapibus ac magna nec ornare. Nam justo ante, faucibus quis sapien non, congue eleifend diam. Proin eget justo ac tortor aliquam finibus. In sapien elit, vestibulum a odio non, ultricies laoreet nisi. Pellentesque mattis lorem vel tristique mollis. Suspendisse ac bibendum mi. Maecenas accumsan lobortis elit ut condimentum. Sed feugiat eu purus a luctus. Fusce ac lobortis justo, eget finibus nisi. Duis dictum est vel bibendum pharetra. Nullam sollicitudin, lacus a imperdiet sollicitudin, tortor sem scelerisque nunc, ut blandit lorem nunc nec nisl. Vivamus ornare hendrerit mi at imperdiet. Phasellus sem sapien, vestibulum vel porta et, dapibus sit amet arcu. Phasellus sed ipsum eu ex interdum ultrices.</p> */}

            <div>
                {active === false && <AllPosts/>}
                {active === true && <SpecificPosts currentGame={currentGameId}/>}
            </div>
            
            </div>
        </section>
    </main>);
}

export default Community;