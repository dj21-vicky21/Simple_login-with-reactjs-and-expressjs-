import React  from "react"
import { Routes, Route,Navigate } from "react-router-dom"; 
import './App.css';
import Authentication from './page/authencationpage'
import Register from './page/registraionpage'
import Home from './page/home'




const Simpleroutering=()=> {

  return (
    <Routes>
        
        <Route exact path="/login" element={<Authentication />} />
       <Route exact path="/signup" element={<Register />} />
       <Route exact path="/home" element={<Home />} />
       <Route path="/*" element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default Simpleroutering;
