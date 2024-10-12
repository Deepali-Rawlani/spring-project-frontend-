import React from 'react'
import Head from '../components/Header/Header'
import '../../src/styles/AboutUs.css'
import { Container } from 'reactstrap'


const About = () => {
  return <>
  <div>
 <Head/>
</div>

<div class="container mt-5">
    
    <div class="content-container">
        <p class="lead text-center">Welcome to Destina, your ultimate travel companion designed to streamline the process of discovering and booking top attractions around the world. At Destina, we believe in making global exploration accessible, enjoyable, and effortless for all.</p>
    </div>
    <div class="content-container">
        <h4>Our Vision</h4>
        <p>At Destina, our vision is to revolutionize the travel experience by providing a seamless and user-friendly platform that connects travelers with the best attractions and experiences worldwide. We aim to be the go-to destination for travel enthusiasts looking to explore new places, cultures, and adventures.</p>
    </div>
    <div class="content-container">
        <h4>What We Offer</h4>
        <p><strong>Discover Attractions:</strong> With Destina, discovering top attractions around the world has never been easier. Our extensive database of attractions is carefully curated to ensure that you have access to the most exciting and must-visit places in every city.</p>
        <p><strong>Effortless Booking:</strong> Say goodbye to the hassle of complicated booking processes. Our platform allows you to easily browse, book, and receive confirmations for your chosen activities, all in one place.</p>
        <p><strong>User-Friendly Experience:</strong> We prioritize user experience, ensuring that our platform is intuitive and easy to navigate. Whether you're a seasoned traveler or planning your first adventure, Destina makes travel planning a breeze.</p>
        <p><strong>Personalized Recommendations:</strong> Based on your interests and previous bookings, Destina offers personalized recommendations to help you discover new and exciting attractions that match your preferences.</p>
        <p><strong>Secure and Reliable:</strong> Your safety and security are our top priorities. Destina uses the latest technology to ensure that your personal information is protected and that your bookings are secure.</p>
    </div>
</div>
 </>

}

export default About