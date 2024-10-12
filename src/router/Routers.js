import React from 'react'
import {Routes, Route, Navigate, Router} from 'react-router-dom'
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'

const Routers = () => {
  return ( 
    <Routes>
        <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} /> 
    </Routes> 
  )
}

export default Routers