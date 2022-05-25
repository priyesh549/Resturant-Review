import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Resturant from './Components/Resturant';
import NavBar from './Components/NavBar';
import { Routes,Route } from 'react-router-dom';
import MoreDetails from './Components/MoreDetails';
import { useState,useEffect } from 'react';
import axios from 'axios';
import AboutUs from './Components/AboutUs';
import User from './Components/User';

function App() {
  const [userdetails,setuserdetails] = useState();
  useEffect(()=>{
    const fetchDetails = async() =>{
      const du = localStorage.getItem("User");
      setuserdetails(du);
    }
  })
  return (
    <div className="App">
        <Routes>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/'  element={<Login/>}/>
          <Route path='/Resturant' element={<Resturant/>}/>
          <Route path='/UserComments/:id' element={<MoreDetails />}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/users' element={<User/>}/>
        </Routes>
    </div>
  );
}

export default App;
