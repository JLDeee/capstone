import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import AuthContext from "./context/AuthContext";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

import About from "./components/About";
import Community from "./components/Community";
import FindDuo from "./components/FindDuo";
import Duo from "./components/Duo";
import Contact from "./components/Contact";
import Faq from "./components/Faq";

import Login from "./components/Login";
import SignUp from "./components/SignUp";

import GamerForm from "./components/GamerForm";
import GamerProfile from "./components/GamerProfile";
import GamerList from "./components/GamerList";
import Success from "./components/Success";



const LOCAL_STORAGE_TOKEN_KEY = "gamers-guild";

function App() {
  const [user, setUser] = useState(null);
  const [userGamer, setUserGamer] = useState(null);
  const[restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);
  const url = "http://localhost:8080";

  useEffect( () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if(token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (jwtToken) => {
    console.log(`this is the token!!! ${jwtToken}`);
    console.log(LOCAL_STORAGE_TOKEN_KEY);
    const decodedUser = jwtDecode(jwtToken);
    console.log(decodedUser.app_user_id);
    console.log(decodedUser.sub);
    console.log(decodedUser.authorities.split(","));
    const pendingUser = {
      appUserId: decodedUser.app_user_id,
      username: decodedUser.sub,
      roles: decodedUser.authorities.split(",")
    }
    
    // localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    // const { sub: username, authorities: authoritiesString } = jwtDecode(token);
    // const roles = authoritiesString.split(",");
    // const user = {
    //   username,
    //   roles,
    //   token,
    //   hasRole(role) {
    //     return this.roles.includes(role);
    //   }
    // };
    console.log(decodedUser);

    console.log(pendingUser);
    setUser(pendingUser);
    
    console.log(user);
    attachGamer(user);
    
    return user;
  }

  const logout = () => {
    setUser(null);
    setUserGamer(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    console.log("wheee logging out");
    console.log(user);
  }

  const attachGamer = (user) => {
    console.log("getting gamer!");
    fetch(`${url}/gamer/user/${user.username}`)
    .then(response => {
      if (response.status === 200) {
          console.log(response);
          return response.json();
      } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then( data => {
        setUserGamer(data);
        console.log(data);
    })
    .catch(console.log);
  }

  const auth = {
    user: user ? {...user} : null,
    userGamer: userGamer ? {...userGamer} : null,
    login,
    logout
  }

  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* if already logged in, navigate to home */}

          <Route path="/login" element={!user && !userGamer ? <Login/> : <Navigate to="/"/>}/>

          <Route path="/sign-up" element={!user && !userGamer ? <SignUp/> : <Navigate to="/"/>}/>
          {/* if not logged in, navigate to login page */}

          <Route path="/profile" element={<GamerProfile/>}/>      
          <Route path="/profile/:id" element={<GamerProfile/>}/>      
          <Route path="/profile/form" element={<GamerForm/>}/>
          <Route path="/profile/:id/form" element={<GamerForm/>}/>

          {/* <Route path="/profile" element={!user ? <Navigate to ="/login"/> : <GamerProfile/>}/>
          <Route path="/profile/form" element={!user ? <Navigate to ="/login"/> : <GamerForm/>}/>
          <Route path="/profile/:id/form" element={!user ? <Navigate to ="/login"/> : <GamerForm/>}/> */}

          <Route path="/gamers" element={!user ? <Navigate to ="/login"/> : <GamerList/>}/>

          <Route path="/about" element={<About/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/find-duo" element={<FindDuo/>}/>
          <Route path="/duo" element={<Duo/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/faq" element={<Faq/>}/>

          <Route path="/success" element={<Success/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
