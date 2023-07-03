import { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

function Match() {
     //State Variables 
     const [youMatched, setYouMatched] = useState([]);
     //const [currentView, setCurrentView] = useState('List');
     const url = 'http://acnhapi.com/v1a/art'
    //  const navigate = useNavigate();
    
     useEffect( () =>{
         fetch(url)
         .then(response => {
             if(response.status === 200) {
                 return response.json();
             } else {
                 return Promise.reject(`Unexpected status code: ${response.status}`);
             }
         })
         .then(data => setYouMatched(data)) //here we are setting our data to our state variable
     }, []); //empty dependency array tells react to run once when the component is initially loaded
     
     console.log(youMatched);
 



    return(

        <section className="container">
            <h1 className="youMatchedHeader">Gamers You've Liked</h1>

            <div className="youMatchedList">
                    {youMatched.map(youMatch =>(
                        <tr key={youMatch.gamer_sender_id}>
                        <td>
                            <Link to={`/match/${youMatch.gamer_1}`}/>
                            <p>{youMatch.gamer_1}</p>
                        </td>
                    </tr>
                    ))}
            </div>
        </section>

    );
}

export default Match;