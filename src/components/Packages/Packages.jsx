import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './packages.css';
import axios from 'axios';
import SearchBar from "../../shared/SearchBar";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/package');
        if (Array.isArray(response.data)) {
          setPackages(response.data);
        } else {
          setError(response.data);
        }
      } catch (error) {
        setError('Error fetching packages');
      }
    };

    fetchPackages();
  }, []);

  const goBack = () => {
        navigate(-1); // This navigates back to the previous page
      };

  return (
    <>
    <div>
        <button className="back_btn" onClick={goBack}>Back</button>
    </div>
    <div id="searchBar">
    <SearchBar/>
    </div>
    
    <div className="container mt-5">
      <h1 className="mb-4">Available Packages</h1>
      {error && <p>{error}</p>}
      <div className="row">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div key={pkg.packageId} className="col-md-4 mb-4">
              <div className="card h-100">
              <h5 className="card-title">{pkg.title}</h5>
              <img className="card-img-top"
                src={`data:image/jpeg;base64,${pkg.image}`}
                alt={pkg.title}
              />
                <div className="card-body">
                {/* <h5 className="card-title">{pkg.location}</h5> */}
                {/* <p className="card-text">{pkg.description}</p> */}
                  <p className="card-text"><strong >Start Date:</strong> {new Date(pkg.startDate).toLocaleDateString()}</p>
                  <p className="card-text"><strong>End Date:</strong> {new Date(pkg.endDate).toLocaleDateString()}</p>
                  <p className="card-text"><strong>Price per Person:</strong> {pkg.pricePerPerson.toFixed(2)} Rs.</p>
                  <p className="card-text"><strong>Seats Available:</strong> {pkg.numberOfSeatsAvailable}</p>
                  <p className="card-text"><strong>Agent:</strong> {pkg.agentName}</p>
                  <Link to={`/confirmation/${pkg.packageId}`} className="btn">Book Now</Link>
                </div>
              </div>
            </div>



          ))
        ) : (
          <p>No packages available</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Packages;

