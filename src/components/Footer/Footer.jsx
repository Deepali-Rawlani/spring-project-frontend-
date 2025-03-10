import React from 'react'
import './footer.css'

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'

import { Link } from 'react-router-dom' 

const quick__links=[
  {
      path:'/home',
      display: 'Home'
  },
  {
      path:'/about-us',
      display: 'About Us'
  },
  {
      path:'/tours',
      display: 'Packages'
  },
]

const quick__links2=[
  {
      path:'/contact-us',
      display: 'Contact Us'
  },
  {
      path:'/login',
      display: 'login'
  },
  {
      path:'#',
      display: 'Register'
  },
]

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              {/* <img src={logo} alt=''/> */}
                    <div>
                        <b id="nm">Des<span id="nm2">tina</span></b>
                    </div>
              <p>Embark on Unforgettable Adventures: Where Every Step Tells a Story</p>

                <div className="social__links d-flex align-items-center gap-4">
                  <span>
                    <Link to='#'><i class="ri-youtube-line"></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i class="ri-github-fill"></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i class="ri-facebook-circle-line"></i></Link>
                  </span>
                  <span>
                    <Link to='#'><i class="ri-instagram-line"></i></Link>
                  </span>
                
                </div>
            </div>
          </Col>

          <Col lg='3'>
            <h5 className="footer__link-title">Discover</h5>

            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg='3'>
             <h5 className="footer__link-title">Quick Links</h5>

              <ListGroup className="footer__quick-links">
                {quick__links2.map((item, index) => (
                  <ListGroupItem key={index} className="ps-0 border-0">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>  
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Contact</h5>

              <ListGroup className="footer__quick-links">
                
                  <ListGroupItem className="ps-0 border-0 d-flex 
                  align-items-center gap-3">
                  
                  <h6>
                    <span><i class="ri-map-pin-line"></i></span>
                    Address:
                  </h6>

                  <p className='mb-0'>Kharghar, Maharashtra</p>
                  </ListGroupItem>

                  <ListGroupItem className="ps-0 border-0 d-flex 
                  align-items-center gap-3">
                  
                  <h6>
                    <span><i class="ri-mail-line"></i></span>
                    Email:
                  </h6>

                  <p className='mb-0'>destina@gmail.com</p>
                  </ListGroupItem>

                  <ListGroupItem className="ps-0 border-0 d-flex 
                  align-items-center gap-3">
                  
                  <h6>
                    <span><i class="ri-phone-fill"></i></span>
                    Phone:
                  </h6>

                  <p className='mb-0'>+91-7654321111</p>
                  </ListGroupItem>
              </ListGroup>
          </Col>

          <Col lg='12' className='text-center pt-5'>
            <p className='copyright'>Copyright {year}, 
            Design and Develop by Team 20. All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer