import React from 'react'
import './newsletter.css'

import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const NewsLetter = () => {
  return (
    <section className='newsletter'>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="newsletter__content">
                        

                        <div className="newsletter__input">
                        <h3>Unforgettable Experiences, One Click Away</h3>
                        </div>

                        <p>Discover the world with Destina, your premier tour management solution offering exclusive travel packages to breathtaking destinations.
                             From exotic getaways to hidden gems, our tailor-made itineraries and unbeatable deals ensure you experience the trip of a lifetime.
                             Book with Destina today and let your adventure begin!</p>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="newsletter__img">
                        <img src={maleTourist} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default NewsLetter