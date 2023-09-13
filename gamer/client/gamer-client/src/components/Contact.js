function Contact(){
    return(<>
    <div className="container">
       <section className="contact">

        <div className="contactUsForm">
        <h2>Contact Us</h2>

        <h3>Have a question?<br/>Shoot us message!</h3>
            <form action="mailto:recipient@example.com" method="get" enctype="text/plain">      
                <input name="name" type="text" className="feedback-input" placeholder="GamerTag" />   
                <input name="email" type="text" className="feedback-input" placeholder="Email" />
                <textarea name="text" className="feedback-input" placeholder="Comment"></textarea>
                <input type="submit" value="SUBMIT"/>
            </form>
        </div>

        <div className="developerContact">
            <h5>Website Developers</h5>
            <p>Maria Alcantara<br>
            </br>Jackie Luu<br>
            </br>Jay Wu</p>
        </div>
{/*         
        <div className="apiContact">
            <h5>API</h5>
            <p>Link: TBA</p>
        </div> */}
       </section>

    </div>
    </>)
}



export default Contact;