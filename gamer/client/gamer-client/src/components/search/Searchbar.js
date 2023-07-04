// import React, {useState} from 'react'


// const Searchbar = () => {
//     const [searchInput, setSearchInput] = useState("");
//     const games = [
//         { name: "League of Legends", title: "League of Legends" },
//         { name: "Yakuza 0", title: "Yakuza 0" },
//         { name: "Ghost Trick: Phantom Detective", title: "Ghost Trick: Phantom Detective" },
//         { name: "Animal Crossing: New Horizons", title: "Animal Crossing: New Horizons" },
//         { name: "Sims 4", title: "Sims 4" }
//     ];

//     const handleChange = (e) => {
//         e.preventDefault();
//         setSearchInput(e.target.value);
//     };

//     if (searchInput.length > 0) {
//         games.filter((game) => {
//         return game.name.match(searchInput);
//     });
//     }

//     return (<div>

//         <input
//         type="search"
//         placeholder="Search here"
//         onChange={handleChange}
//         value={searchInput} />

//         <table>
//         <tr>
//             <th>Game</th>
//         </tr>

//         {
//         games.filter(game => {
//             if (searchInput === '') {
//                 return game;
//             } else if (game.title.toLowerCase().includes(searchInput.toLowerCase())) {
//                 return game;
//             }
//         }).map((game, index) => (

//         <div key={index}>
//         <tr>
//             <td>{game.name}</td>
//         </tr>
//         </div>

//         ))}
//         </table>

//     </div>);


// }

// import React, { useEffect, useState } from 'react'
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';


// const Searchbar = () => {

//     const [myOptions, setMyOptions] = useState([])
//     const url = 'api.thegamesdb.net/v1.1/Games/ByGameName'

//     const getDataFromAPI = () => {
//             console.log("Options Fetched from API")
//             fetch(url)
//                 .then(response => {
//                     if (response.status === 200) {
//                         return response.json();
//                     } else {
//                         return Promise.reject(`Unexpected status code: ${response.status}`);
//                     }
//                 }).then((response) => {
//                     console.log(response.data)
//                     for (let i = 0; i < response.data.length; i++) {
//                         myOptions.push(response.data[i].name)
//                     }
//                     setMyOptions(myOptions)
//                 })
//             }
//             //     })
//             //     .then(data => setMyOptions(data)) // here we are setting our data to our state variable 
//             //     .catch(console.log);
//             // }; // empty dependency array tells react to run once when the component is intially loaded

//     return (
//         <div style={{ marginLeft: '40%', marginTop: '60px' }}>
//         <h3>Choose a game</h3>
//         <Autocomplete
//             style={{ width: 500 }}
//             freeSolo
//             autoComplete
//             autoHighlight
//             options={myOptions}
//             renderInput={(params) => (
//                 <TextField {...params}
//                     onChange={getDataFromAPI}
//                     variant="outlined"
//                     label="Search Box"
//                 />
//             )}
//         />
//         </div>
//     );
// }





import React, {useState} from "react";
const Searchbar = ({setResults}) => {
    const [input, setInput] = useState("")
    const url = 'http://localhost:8080/game'
    const fetchData = (value) => {
        fetch(url)
        .then((response) => response.json()
        .then(json => {
            const results = json.filter((game) => {
                return value && game.gameTitle.toLowerCase().includes(value);
            });
            setResults(results);
        }))
    }
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
        if(value === "") {
            window.location.reload(false);
        }
    }
    return(
        <div>
            <input placeholder="Type to search:" value={input} onChange={(e) => handleChange(e.target.value)}/>
        </div>

    );
}

export default Searchbar;