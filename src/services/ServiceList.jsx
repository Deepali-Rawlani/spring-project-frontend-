import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'

import card1Img from '../assets/images/card1.jpg'
import card2Img from '../assets/images/card2.jpg'
import card3Img from '../assets/images/card3.jpg'

const servicesData = [
    {
        imgUrl: card1Img,
        title: 'Discover Top Attractions',
        desc: 'Explore our collection of must-visit places and hidden gems across the globe.',
    },
    {
        imgUrl: card3Img,
        title: 'Hassle-Free Bookings',
        desc: 'Easily find and book attractions, tours, and activities with instant confirmations.',
    },
    {
        imgUrl: card2Img,
        title: 'Personalized Recommendations',
        desc: 'Create your perfect journey with our easy-to-use customization tools.',
    },
]

const ServiceList = () => {
  return (
    <>
        {servicesData.map((item, index) => (
            <Col lg="3" md='6'sm='12' className='mb-4' key={index}><ServiceCard item={item} /></Col>
        ))}
    </>
  )
}

export default ServiceList