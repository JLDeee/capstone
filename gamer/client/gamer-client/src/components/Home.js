function Home(){
    return(<>
    <div className="container">
       <header>
        <div>
            <h1>Welcome to Gamers' Guild!</h1>
        </div>
       </header>
       <section>

       <div className="logo">
       <img src="https://ov10-engine.flamingtext.com/netfu/tmp28000/coollogo_com-152464151.png"></img>
       </div>

       <div className="splashImage">
       <img src="https://img.freepik.com/premium-vector/neon-game-joystick-icon-glowing-joystick-brick-wall-background-vector-illustration_175392-111.jpg"></img>
       </div>

        <div className="getStarted">
        <Link to={'/'}>Get Started!</Link>
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
    </>)
    
}

export default Home;