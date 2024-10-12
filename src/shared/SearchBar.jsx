import React, { useRef, useState } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import axios from 'axios';

const SearchBar = () => {
  const locationRef = useRef('');
  const [packages, setPackages] = useState([]);

  const searchHandler = async () => {
    const location = locationRef.current.value;

    try {
      const response = await axios.get(`http://localhost:8082/api/package/search/${location}`);
      if (Array.isArray(response.data)) {
        setPackages(response.data);
      } else {
        setPackages([]); // In case the response data is not an array
        alert("No package found.");
      }
    } catch (error) {
      console.error('There was an error fetching the packages!', error);
      setPackages([]); // Ensure packages is reset to an empty array on error
      alert("No package found.");
    }
  };

  return (
    <Col lg='12'>
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>Location</h6>
              <input type='text' placeholder='Where are you going?' ref={locationRef} />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>

      {/* Display search results */}
      <div className='row'>
        <div className="search-results mt-4">
          {packages.length > 0 ? (
            <div className="package-cards col-lg-4">
              {packages.map((pkg) => (
                <div className="package-card" key={pkg.packageId}>
                  <img src={`data:image/jpeg;base64,${pkg.image}`} alt={pkg.title} style={{ width: 300, height: '200px' }} />
                  <h5>{pkg.title}</h5>
                  <p><strong>Location:</strong> {pkg.location}</p>
                  <p><strong>Price per Person:</strong> {pkg.pricePerPerson} Rs.</p>
                  <p><strong>Seats Available:</strong> {pkg.numberOfSeatsAvailable}</p>
                </div>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </Col>
  );

};

export default SearchBar;


