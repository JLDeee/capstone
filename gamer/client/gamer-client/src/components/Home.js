import { Link } from 'react-router-dom';

function Home(){

    return(
    <div className="container">
       <header>
        <div>
            <h1>Welcome to Gamers' Guild!</h1>
        </div>
       </header>
       <section>

       <div className="logo">
        <p>Insert Logo Here (getting rid of 404 logo not found)</p>
       </div>

       <div className="splashImage">
       <img src="https://img.freepik.com/premium-vector/neon-game-joystick-icon-glowing-joystick-brick-wall-background-vector-illustration_175392-111.jpg"/>
       </div>

        <div className="getStarted">
            <Link to={'/sign-up'}>Get Started!</Link>
        </div>

        <div className='introDuoFinder'>
            <p>Our duo finder offers an easy way for gamers to connect one on one. After creating your account you can begin swiping on potential gaming friends! 
                If you both swipe on eachother you can start messaging one another to talk about gaming, set up a game together, or just chill! 
                Whatever gaming interests you may have, you're sure to find someone who shares the same interests!</p>
                <Link to={'/duo'}>Learn More</Link>
        </div>

        <div className='introToForum'>
            <p>Our Community Forum offers a way for players to make posts for specific games they're looking for partners for. 
                You can start by looking through the forum to check out what people are playing! After you've gotten accustomed to the Community Forum, 
                you can either begin accepting posts from other players or make a forum post yourself!</p>
                <Link to={'/community'}>View Posts</Link>
        </div>

       <div className="ourStory">
        <p>We created Gamers' Guild in 2023 with the goal of creating and fun and safe environment,
             where gamers from all over the world can connect with one another to play games, make friends, and just have a good time while building a community!
             from popular games like Pokemon, Call of Duty and League of Legends, to more niche titles like Animal Crossing, Stardew Valley and Dark Souls, 
             you're sure to find people who share the same interests as you here!</p>
       </div>

       <div className="successStory1">
        <p><i>I really love Animal Crossing! Since I started using Gamers' Guild, 
            I've been able to meet a lot of cool people and visit so many fun and interesting villages! 
            I would definitely recommend this site if you're looking for people who like the same games you do! - Isabelle</i></p>
       </div>

       <div className="successStory2">
        <p><i>This site is pretty cool. I play a lot of niche games so it was pretty hard to find anyone to talk to about these games, 
            but Gamers' Guild made it really easy for me to find people who liked the same niche games I did 
            and I've been able to make a lot of great friendships on this site! - DanTheMan</i></p>
       </div>

       <div className="successStory3">
        <p><i>I was suffering in bronze rank for the longest time, 
            but with the duo finder I was able to find a gaming partner for League of Legends to boost me to diamond. 
            I'm finally in the rank I deserve!!! - JLDee</i></p>
       </div>

       <div className="successStory4">
        <p><i>RAAAAHHHHH! I LOOOVVEEEE THIS SITE!!! RRRRRAAAAAHHHHHH!!! - RagingTeemo</i></p>
       </div>

       </section>
       <footer>
        <p>Copyright 2023</p>
       </footer>
    </div>
    )
    
}

export default Home;