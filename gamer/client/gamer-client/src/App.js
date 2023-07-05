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
import Faq from "./components/Faq";
import Match from "./components/Match";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import GamerForm from "./components/GamerForm";
import GamerProfile from "./components/GamerProfile";
import GamerList from "./components/GamerList";
import Success from "./components/Success";
import Message from "./components/Message";




const LOCAL_STORAGE_TOKEN_KEY = "gamers-guil";

function App() {
  const [user, setUser] = useState(null);
  const[restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect( () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if(token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    const { sub: username, authorities: authoritiesString } = jwtDecode(token);
    const roles = authoritiesString.split(",");
    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };
    console.log(user);
    setUser(user);
    return user;
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    console.log("wheee logging out");
    console.log(user);
  }

  const auth = {
    user: user ? {...user} : null,
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
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
          <Route path="/sign-up" element={!user ? <SignUp/> : <Navigate to="/"/>}/>
          {/* if not logged in, navigate to login page */}

          <Route path="/profile" element={<GamerProfile/>}/>          
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
          <Route path="/search-bar" element={<Searchbar/>}/>
          <Route path="/faq" element={<Faq/>}/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/match" element={<Match/>}/>
          {/* insert other routes here! */}
          <Route path="/success" element={<Success/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/message" element={<Message/>}/>
        </Routes>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
