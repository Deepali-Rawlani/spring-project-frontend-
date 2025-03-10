import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 1000,
        swipeToSlide:true,
        autoplaySpeed: 2000,
        slidesToShow: 3,

        responsive:[
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slideToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slideToScroll: 1,
                },
            },
        ]

    }

  return (
    <Slider { ... settings}>
        <div className="testimonial py-4 px-3">
            <p>Overall, Travel World exceeded my expectations, making my trip truly memorable. 
                I highly recommend their services to anyone looking for a hassle-free and enriching travel experience.</p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>Punyesh Ranjit</h6>
                        <p>Customer</p>
                    </div>
                </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>I recently booked a trip with Travel World, and it was one of the best travel experiences I've ever had. 
                They provided personalized itinerary options that perfectly matched my interests and budget.</p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>Deepali Rawlani</h6>
                        <p>Customer</p>
                    </div>
                </div>
        </div>
        <div className="testimonial py-4 px-3">
            <p>The accommodations were top-notch, offering comfort and excellent amenities at every stop. 
                The guided tours were informative and engaging, allowing us to explore the local culture and 
                hidden gems that we wouldn't have discovered on our own.</p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>Sahil Bagde </h6>
                        <p>Customer</p>
                    </div>
                </div>
        </div>
    </Slider>
  )
}

export default Testimonials