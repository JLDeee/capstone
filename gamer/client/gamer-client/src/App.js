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
import Searchbar from "./components/search/Searchbar";
import Post from "./components/search/Post";
import MakePost from "./components/MakePost";
import Faq from "./components/Faq";

import Login from "./components/Login";
import SignUp from "./components/SignUp";

import GamerForm from "./components/GamerForm";
import GamerProfile from "./components/GamerProfile";
import GamerList from "./components/GamerList";
import Success from "./components/Success";
import Error from "./components/Error";



const LOCAL_STORAGE_TOKEN_KEY = "gamers-guild";
const BLANK_USER = {
  appUserId:"",
  username:"",
  roles:[]
}

const BLANK_USER_GAMER = {
  gamerId:"",
  appUserId:"",
  genderType:"",
  gamerTag:"",
  birthDate:"",
  bio:"",
  games:[],
  sentMatches:[],
  receivedMatches:[]
}

function App() {
  const [user, setUser] = useState(BLANK_USER);
  const [userGamer, setUserGamer] = useState(BLANK_USER_GAMER);
  const[restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);
  const url = "http://localhost:8080";

  useEffect( () => {
    const jwtToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if(jwtToken) {
      login(jwtToken);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  const login = (jwtToken) => {
    console.log(`this is the token!!! ${jwtToken}`);
    console.log(LOCAL_STORAGE_TOKEN_KEY);
    const decodedUser = jwtDecode(jwtToken);
    console.log(decodedUser.app_user_id);
    console.log(decodedUser.sub);
    console.log(decodedUser.authorities.split(","));
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, jwtToken);
    console.log(LOCAL_STORAGE_TOKEN_KEY);
    const user = {
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

    console.log(user);
    setUser(user);
    
    console.log(user);
    attachGamer(user);
    
    return user;
  }

  const logout = () => {
    setUserGamer(BLANK_USER_GAMER);
    setUser(BLANK_USER);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    console.log(user);
    console.log(LOCAL_STORAGE_TOKEN_KEY);
    console.log("wheee logging out");
  }

  const attachGamer = (user) => {
    console.log("getting gamer!");
    console.log(user);
    fetch(`${url}/gamer/user/${user.appUserId}`)
    .then(response => {
      if (response.status === 200) {
          console.log(response);
          return response.json();
      } else {
          return Promise.reject(`Unexpected status code: ${response.status}. Gamer not found.`);
      }
    })
    .then( data => {
        console.log("we're attaching a gamer!");
        const userGamer = data;
        console.log(data);
        console.log(userGamer);
        setUserGamer(userGamer);
        console.log(userGamer);
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

  console.log(LOCAL_STORAGE_TOKEN_KEY);
  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>

          {/* LOGIN/SIGN UP (CREATE APPUSER) - If you have a username (aka logged in), go to Home instead. 
          Otherwise, you can Login/SignUp */}
          <Route path="/login" element={user.username ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/sign-up" element={user.username ? <Navigate to="/"/> : <SignUp/>}/>

          {/* VIEW YOUR PROFILE (VIEW GAMER) - If you don't have a username (aka not logged in), go to Login instead. 
          Otherwise, if don't have a gamer tag (aka no profile), go to Create Profile instead. 
          Otherwise, you can View Profile. */}
          <Route path="/profile" element={
            !user.username ? <Navigate to="/login"/> : (
              !userGamer.gamerTag ? <Navigate to="/profile/form"/> : <GamerProfile/>
            )}/>
          <Route path="/profile/:id" element={<GamerProfile/>}/>

          {/* CREATE PROFILE (ADD GAMER) - If you don't have a username (aka not logged in), go to Login instead. 
          Otherwise, if you DO have a gamer tag (aka already made profile) go to View Your Profile instead. 
          Otherwise, you can Create Profile */}
          <Route path="/profile/form" element={
            !user.username ? <Navigate to="/login"/> : (
              userGamer.gamerTag ? <Navigate to={"/profile"}/> : <GamerForm/>
            )}/>

          {/* EDIT PROFILE (UPDATE GAMER) - If you don't have a username (aka not logged in), go to Login instead. 
          Otherwise, if you don't have a gamer tag (aka no profile) go to Create Profile instead. 
          Otherwise, you can Edit Profile (1 more validation in GamerForm for if your gamer id matches the url id!) */}
          <Route path="/profile/:id/form" element={
            !user.username ? <Navigate to="/login"/> : (
              !userGamer.gamerTag ? <Navigate to={`/profile/form`}/> : <GamerForm/>
          )}/>

          {/* VIEW GAMERS LIST (VIEW ALL GAMERS) - If you don't have a username (aka not logged in), go to Login instead.
          Otherwise, you can View All Gamers. */}
          <Route path="/gamers" element={
            !user.username ? <Navigate to ="/login"/> : <GamerList/>}/>

          <Route path="/about" element={<About/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/find-duo" element={<FindDuo/>}/>
          <Route path="/duo" element={<Duo/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/search-bar" element={<Searchbar/>}/>
          <Route path="/faq" element={<Faq/>}/>

          <Route path="/success" element={<Success/>}/>
          <Route path="/error" element={<Error/>}/>
          <Route path="*" element={<NotFound/>}/>

          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/make-post" element={<MakePost/>}/>
        </Routes>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
