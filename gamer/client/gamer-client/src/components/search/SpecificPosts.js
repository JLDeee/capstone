import React from "react";
import { useEffect, useState } from "react";

const SpecificPosts = ({ userId }) => {
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

    // let userIndex = users.map((user) => {
    //     return user.id
    // })

    return(
        
        <div>
            {users.map((user, index) => {
                return <p key={index}>{user.name}</p>
            })}
            {/* {users[userIndex].map(user => (
                <p>{user.name}</p>
            ))} */}
            {/* {users.map((user, index) => {
                return <p key={index}>{users[{userId}].name}</p>
            })} */}
        </div>
    );
}

export default SpecificPosts;