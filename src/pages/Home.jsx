import React from 'react'
import '../styles/home.css'

import { Container,Row,Col} from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceImg from '../assets/images/experience.png'

import Subtitle from '../shared/Subtitle'

import SearchBar from '../shared/SearchBar'
import ServiceList from '../services/ServiceList'
//import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'
import NewsLetter from '../shared/NewsLetter'
import Head from '../components/Header/Header'

const Home = () => {
  return (
    <>
    <Head/>
    {/* ========== hero section start =========== */}
    <section>
      {/* <Nav/> */}
      <Container>
        <Row>
          <Col lg='6'>
          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center">
              <Subtitle Subtitle={'Know Before You Go'}/>
              <img src={worldImg} alt='' />
            </div>
            <h1>Your Gateway To Effortless Explorations!!{" "} 
              
            </h1>
            <p>Traveling allows you to experience new places, meet different people,
               and try new activities. These experiences create special moments and memories that you can cherish for a lifetime.</p>
          </div>
          </Col>

          <Col lg='2'>
            <div className="hero__img-box">
              <img src={heroImg} alt='' />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box hero__video-box mt-4">
              <video src={heroVideo} alt='' controls/>
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box mt-5">
              <img src={heroImg02} alt='' />
            </div>
          </Col>
          <Row class="mt-5"> 
          <SearchBar />
          </Row>
          
        </Row>
      </Container>
    </section>
    {/* ========== hero section end =========== */}
    <section class="mt-5">
      <Container class="mt-5">
      <Container>
        <Row >
          <Col lg='3'>
            <h5 className="services__subtitle">What we serve</h5>
            <h2 className="services__title">We offer our best services</h2>
          </Col>
          <ServiceList/>
        </Row>
      </Container>
      </Container>
    </section>

    {/* ============= Featured tour section start =============== */}
    <section>
      <Container>
        <Row>
          <Col lg='12' className="mb-5">
            <Subtitle Subtitle={'Explore'}/>
            <h2 className="featured_tour-title"> Our featured tours</h2>
          </Col>
          {/* <FeaturedTourList /> */}
        </Row>
      </Container>
    </section>

    {/* ============= Featured tour section end =============== */}

    {/* ============= experience section start ================ */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="experience__content">
            <Subtitle Subtitle={'Experience'}/>
              <h2>With our all experience <br /> we will serve you</h2>
              <p>All-inclusive travel packages that cover flights, accommodation, transportation, and guided tours, 
                providing a hassle-free travel experience with every detail taken care of.</p>
            </div>

            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className='counter__box'>
                <span>12k+</span>
                <h6>Successful Trip</h6>
              </div>
              <div className='counter__box'>
                <span>2k+</span>
                <h6>Regular clients</h6>
              </div>
              <div className='counter__box'>
                <span>15k</span>
                <h6>years experience</h6>
              </div>
            </div>
          </Col>
          <Col lg='6'>
            <div className="experience__img">
              <img src={experienceImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    {/* ============= experience section end ================ */}

    {/* ============= gallery section start ================ */}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle Subtitle={'Gallery'} />
            <h2 className="gallery__title">
              Visit our customers tour gallery
            </h2>
          </Col>
          <Col lg='12'>
          <MasonryImagesGallery />
          </Col>
        </Row>
      </Container>
    </section>

    {/* ============= gallery section end ================ */}

    {/* ============= testimonial section start ================ */}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle Subtitle={'Fans Love'} />
            <h2 className="testimonial__title">What our fans say about us</h2>
          </Col>
          <Col lg='12'>
            <Testimonials />
          </Col>
        </Row>
      </Container>
    </section>

    {/* ============= testimonial section end ================ */}
    <NewsLetter/>
    </>
  )
}

export default Home