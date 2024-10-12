import React from 'react'
import tanvee from '../assets/images/tanvee.jpeg'
import deepali from '../assets/images/Deepali.jpeg'
import praharsh from '../assets/images/Praharsh.jpeg'
import punyesh from '../assets/images/punyesh.jpeg'
import sahil from '../assets/images/Sahil.jpeg'
import Head from '../components/Header/Header'

const ContactUs = () => {
  return (
    <>
    <Head/>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }} className="container mt-3">
      <h2 style={{ textAlign: 'center', color: '#fff' }}>Contact Us</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'nowrap' }} className="main-content">

        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          margin: '20px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          width: '70%',
          boxSizing: 'border-box',
          textAlign: 'center',
          color: '#333'
        }} className="card">
          <img
            src={praharsh}
            alt="praharsh"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              display: 'block',
              margin: '0 auto 20px'
            }}
          />
          <h3>Praharsh Gaudani</h3>
          <p>Contact: +919527750339</p>
          <p>Email: praharsh@gmail.com</p>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          margin: '20px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          width: '70%',
          boxSizing: 'border-box',
          textAlign: 'center',
          color: '#333'
        }} className="card">
          <img
            src={sahil}
            alt="Sahil"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              display: 'block',
              margin: '0 auto 20px'
            }}
          />
          <h3>Sahil Bagde</h3>
          <p>Contact: +919167765758</p>
          <p>Email: sahil@gmail.com</p>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          margin: '20px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          width: '70%',
          boxSizing: 'border-box',
          textAlign: 'center',
          color: '#333'
        }} className="card">
          <img
            src={deepali}
            alt="Deepali"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              display: 'block',
              margin: '0 auto 20px'
            }}
          />
          <h3>Deepali Rawlani</h3>
          <p>Contact: +917709790968</p>
          <p>Email: deepali@gmail.com</p>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          margin: '20px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          width: '70%',
          boxSizing: 'border-box',
          textAlign: 'center',
          color: '#333'
        }} className="card">
          <img
            src={tanvee}
            alt="Tanvee"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              display: 'block',
              margin: '0 auto 20px'
            }}
          />
          <h3>Tanvee Naik</h3>
          <p>Contact: +919527750339</p>
          <p>Email: tanvee@gmail.com</p>
        </div>


        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '5px',
          margin: '20px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          width: '70%',
          boxSizing: 'border-box',
          textAlign: 'center',
          color: '#333'
        }} className="card">
          <img
            src={punyesh}
            alt="punyesh"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              display: 'block',
              margin: '0 auto 20px'
            }}
          />
          <h3>Punyesh Ranjit</h3>
          <p>Contact: +919527750339</p>
          <p>Email: punyesh@gmail.com</p>
        </div>

      </div>
    </div>
  </>
  )
}

export default ContactUs