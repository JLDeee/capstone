import { Link } from 'react-router-dom';
import GGTitle from '../images/gg_title_chill.png'
import GGProfile from '../images/gg_profile.png'
import GGMatch from '../images/gg_match.png'
import GGLogo from '../images/gg_logo_chill.png'
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

function Home(){
    useEffect(() => {
         
        /*Image Animations*/
        gsap.set(".splashImage img", {
            autoAlpha: 1,
            scale: 1
        })

        gsap.from(".splashImage img", {
            scrollTrigger: {
                trigger: ".splashImage img",
                    start: "top top",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            rotation: 360,
            autoAlpha: 0,
            scale: 0
        })

        /*promo image 1 and text Animations*/
        gsap.set("#promoImg1", {
            autoAlpha: 0,
            scale: 0
        })

        gsap.from("#promoImg1", {
            scrollTrigger: {
                trigger: "#promoImg1",
                    start: "top center",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            scale: 1
        })

        gsap.set(".createYourProfile", {
            autoAlpha: 0,
            scale: 0
        })

        gsap.from(".createYourProfile", {
            scrollTrigger: {
                trigger: ".createYourProfile",
                    start: "top center",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            scale: 1
        })

        /*promo image 2 and text Animations*/
        gsap.set("#promoImg2", {
            autoAlpha: 0,
            scale: 0
        })

        gsap.from("#promoImg2", {
            scrollTrigger: {
                trigger: "#promoImg2",
                    start: "center center",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            scale: 1
        })

        gsap.set(".chatWithOtherGamers", {
            autoAlpha: 0,
            scale: 0
        })

        gsap.from(".chatWithOtherGamers", {
            scrollTrigger: {
                trigger: ".chatWithOtherGamers",
                    start: "center center",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            scale: 1
        })

        /*About image and text Animations*/
        gsap.set(".aboutImg", {
            autoAlpha: 0,
            scale: 0
        })

        gsap.from(".aboutImg", {
            scrollTrigger: {
                trigger: ".aboutImg",
                    start: "center center",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            scale: 1
        })

        gsap.set(".aboutGG", {
            autoAlpha: 0,
            scale: 0
        })

        gsap.from(".aboutGG", {
            scrollTrigger: {
                trigger: ".aboutGG",
                    start: "center center",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            scale: 1
        })

        /*Success stories Animations*/
        gsap.set("#ss1", {
            autoAlpha: 0,
            x: 1000
        })

        gsap.from("#ss1", {
            scrollTrigger: {
                trigger: "#ss1",
                    start: "center bottom",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            x: 0
        })

        gsap.set("#ss2", {
            autoAlpha: 0,
            x: 1000
        })

        gsap.from("#ss2", {
            scrollTrigger: {
                trigger: "#ss2",
                    start: "center bottom",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            x: 0
        })

        gsap.set("#ss3", {
            autoAlpha: 0,
            x: 1000
        })

        gsap.from("#ss3", {
            scrollTrigger: {
                trigger: "#ss3",
                    start: "center bottom",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            x: 0
        })

        gsap.set("#ss4", {
            autoAlpha: 0,
            x: 1000
        })

        gsap.from("#ss4", {
            scrollTrigger: {
                trigger: "#ss4",
                    start: "center bottom",
                    end: "+= 10",
                    scrub: 1
                },
            duration: 0.5,
            autoAlpha: 1,
            x: 0
        })
    })


    const auth = useContext(AuthContext);

    return(
    <div className="container">
        <div className="splashImage">
            <img src={GGTitle} alt="A neon Gamer's Guild title logo"/>
            {(auth.user.username && !auth.userGamer.gamerTag) && (
                    <div>
                    <div className='alert'>
                        USER:<strong> {auth.user.username}</strong></div>
                        <Link to={'/profile/form'}><button className='button buttonLg'>Create Profile</button></Link>
                    </div>
                    )}
                {auth.userGamer.gamerTag && (
                    <div className='alert'>GT:<strong> {auth.userGamer.gamerTag}</strong></div>)}
            {!auth.user.username && (
            <Link to={'/login'}><button className='button buttonLg'>Get Started</button></Link>
            )}
        </div>
        <section>
        <div className="ggPromo">
            <h2 className='createYourProfile'>Create your
                <br/><span className="boldBlue">PROFILE</span>!</h2>
            <img id='promoImg1' className="promoImg" src={GGProfile} alt="A graphic showing profiles similar to trading card games"/>
            <p className='duoText'>Our duo finder offers an easy way for gamers to connect one on one. After creating your account you can begin swiping on potential gaming friends! 
            If you both swipe on eachother you can start messaging one another to talk about gaming, set up a game together, or just chill! 
            Whatever gaming interests you may have, you're sure to find someone who shares the same interests!</p>   
                <Link to={'/duo'}><button className='button'>Learn More</button></Link>            

            <h2 className='chatWithOtherGamers'>Chat with other 
                <br/><span className="boldPink">GAMERS</span>!</h2>
            <img id='promoImg2' className="promoImg" src={GGMatch} alt="A graphic showing two profile cards interacting and saying GG!"/>
            <p className='forumText'>Our Community Forum offers a way for players to make posts for specific games they're looking for partners for. 
                            You can start by looking through the forum to check out what people are playing! After you've gotten accustomed to the Community Forum, 
                            you can either begin accepting posts from other players or make a forum post yourself!</p>
                <Link to={'/community'}><button className='button'>View Posts</button></Link>
        {/* </div> */}

        {/* <div className='homeInfo'>
            <div className='introDuoFinder'>
                <img src={'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'} width="900" height="600"/>        

            </div>

            <div className='introToForum'>
                <img src={'https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'} width="900" height="600"/>
                
            </div>
        </div> */}
        

       {/* <div className="ourStory"> */}
       <h2 className='aboutGG'>About
            <br/><span className="boldYellow">G</span>AMERS' <span className="boldYellow">G</span>UILD</h2>
       
        <img className="aboutImg" src={GGLogo} alt="The Gamers' Guild logo: A 3D cube"/>
        <p>
        We created Gamers' Guild in 2023 with the goal of creating and fun and safe environment,
             where gamers from all over the world can connect with one another to play games, make friends, and just have a good time while building a community!
             from popular games like Pokemon, Call of Duty and League of Legends, to more niche titles like Animal Crossing, Stardew Valley and Dark Souls, 
             you're sure to find people who share the same interests as you here!</p>
       </div>

       <div id="ss1" className="successStory">
        <p><i>I really love Animal Crossing! Since I started using Gamers' Guild, 
            I've been able to meet a lot of cool people and visit so many fun and interesting villages! 
            I would definitely recommend this site if you're looking for people who like the same games you do! - Isabelle</i></p>
       </div>

       <div id="ss2" className="successStory">
        <p><i>This site is pretty cool. I play a lot of niche games so it was pretty hard to find anyone to talk to about these games, 
            but Gamers' Guild made it really easy for me to find people who liked the same niche games I did 
            and I've been able to make a lot of great friendships on this site! - DanTheMan</i></p>
       </div>

       <div id="ss3" className="successStory">
        <p><i>I was suffering in bronze rank for the longest time, 
            but with the duo finder I was able to find a gaming partner for League of Legends to boost me to diamond. 
            I'm finally in the rank I deserve!!! - JLDee</i></p>
       </div>

       <div id="ss4" className="successStory">
        <p><i>RAAAAHHHHH! I LOOOVVEEEE THIS SITE!!! RRRRRAAAAAHHHHHH!!! - RagingTeemo</i></p>
       </div>

       </section>
    </div>
    )
    
}

export default Home;