import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import AuthContext from "./context/AuthContext";
import jwtDecode from "jwt-decode";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Community from "./components/Community";
import FindDuo from "./components/FindDuo";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const LOCAL_STORAGE_TOKEN_KEY = "gamersGuildToken";

function App() {
  const [user, setUser] = useState(null);
  const[restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect( () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if(token) {
      Login(token);
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
    setUser(user);
    return user;
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
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
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/find-duo" element={<FindDuo/>}/>
          <Route path="*" element={<NotFound/>}/>
          {/* insert other routes here! */}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
