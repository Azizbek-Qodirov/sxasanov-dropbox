import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes , Route, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import User from './pages/Userpage/Userpage'
import {useEffect,useState} from 'react'
import {auth} from "./firebase"
import Profile from './pages/Profile/Profile';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Loader from './components/loader/loader';

function App() {

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.providerData[0]);
        // setUser(null);
        console.log(currentUser.providerData[0]);
        setLoader(false);
      }
      if (!currentUser) {
        setUser(null);
        setLoader(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  if (loader) {
    return <Loader/>;
  }
  return <div className='App'>
    <Router >
      <Routes>
        <Route path='/' element={user ? <Home name={userName} /> : <Navigate to="auth/login" />}  />
        <Route path='/auth/login' element={!user ? <Login />:<Navigate to="/" />} />
        <Route path='/auth/register' element={!user ? <Signup /> :<Navigate to="/" />} />
        <Route path='/user' element={user ? <User />:<Navigate to="auth/login" />} />
        <Route path="/profile" element={user ? <Profile setUserName={setUserName} />:<Navigate to="auth/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </div>;
  
}

export default App;
