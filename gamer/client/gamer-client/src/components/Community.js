import Searchbar from "./search/Searchbar";
import SpecificPosts from "./search/SpecificPosts";
import { useEffect, useState } from "react";


function Community() {
    const [results, setResults] = useState([]);
    const [active, setActive] = useState(false);
    const [users, setUser] = useState([]);
    const url = 'http://jsonplaceholder.typicode.com/users'

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => setUser(data)) // here we are setting our data to our state variable 
            .catch(console.log);
    }, []); // empty dependency array tells react to run once when the component is intially loaded

    // let userId = users.map((user) => {
    //     return user.id
    // })


    return(<>
        <section className="about">
            <div>
                <Searchbar setResults={setResults}/>
            </div>
            <div>
                {
                    results.map((result, id) => {
                        return <div key={id} onClick={() => setActive(true)}>{result.name}</div>
                    })
                }
                <div className="post">
                    {active === true && <SpecificPosts userIndex={users.map(user => {return user.id})}/>}
                </div>
            </div>
            <p className="communityP">In dapibus ac magna nec ornare. Nam justo ante, faucibus quis sapien non, congue eleifend diam. Proin eget justo ac tortor aliquam finibus. In sapien elit, vestibulum a odio non, ultricies laoreet nisi. Pellentesque mattis lorem vel tristique mollis. Suspendisse ac bibendum mi. Maecenas accumsan lobortis elit ut condimentum. Sed feugiat eu purus a luctus. Fusce ac lobortis justo, eget finibus nisi. Duis dictum est vel bibendum pharetra. Nullam sollicitudin, lacus a imperdiet sollicitudin, tortor sem scelerisque nunc, ut blandit lorem nunc nec nisl. Vivamus ornare hendrerit mi at imperdiet. Phasellus sem sapien, vestibulum vel porta et, dapibus sit amet arcu. Phasellus sed ipsum eu ex interdum ultrices.</p>
            <div className="posts"></div>
        </section>
    </>);
}

export default Community;