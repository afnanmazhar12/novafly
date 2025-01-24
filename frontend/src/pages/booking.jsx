import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../design/book.css';
import { useNavigate } from 'react-router-dom';

const Booking = () => {

  const [cities, setCities] = useState([]);
  const [depcity, setDepcity] = useState("");
  const [arrcity, setArrcity] = useState("");
  const [depdate, setDepdate] = useState("");
  const [arrdate, setArrdate] = useState("");
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    teenagers: 0,
  });
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [activeClass, setActiveClass] = useState('');
  const navigate = useNavigate();

  // Fetch cities data
  const fetchData = async () => {
    try {
      const response = await fetch('https://api-pi-one-37.vercel.app/cities');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // Load saved data from localStorage when the component mounts
    const savedData = JSON.parse(localStorage.getItem('userFlightData'));
    if (savedData) {
      setDepcity(savedData.depcity || "");
      setArrcity(savedData.arrcity || "");
      setDepdate(savedData.depdate || "");
      setArrdate(savedData.arrdate || "");
      setPassengers(savedData.passengers || {
        adults: 1,
        children: 0,
        infants: 0,
        teenagers: 0,
      });
      setActiveClass(savedData.flightType || ''); 
    }
  }, []);

  // Save to localStorage whenever there's a change
  const saveToLocalStorage = () => {
    const userData = {
      depcity,
      arrcity,
      depdate,
      arrdate,
      passengers,
      flightType: activeClass, 
    };
    localStorage.setItem('userFlightData', JSON.stringify(userData));
    console.log('Data saved to local storage:', userData);
  };

  // Handlers for changes in form inputs
 const handleDepChange = (e) => {
  const updatedDepCity = e.target.value;

  // Update depcity state
  setDepcity(updatedDepCity);

  // Save updated value to localStorage immediately after setting the state
  const userData = {
    depcity: updatedDepCity,  // Use the updated depcity value
    arrcity,
    depdate,
    arrdate,
    passengers,
    flightType: activeClass, 
  };
  localStorage.setItem('userFlightData', JSON.stringify(userData));
  console.log('Data saved to local storage:', userData);
};



  const handleArrChange = (e) => {
    const updatedArrCity = e.target.value;
  
    // Update arrcity state
    setArrcity(updatedArrCity);
  
    // Save updated value to localStorage immediately after setting the state
    const userData = {
      depcity,
      arrcity: updatedArrCity,  // Use the updated value here
      depdate,
      arrdate,
      passengers,
      flightType: activeClass, 
    };
    localStorage.setItem('userFlightData', JSON.stringify(userData));
    console.log('Data saved to local storage:', userData);
  };
  
  const handleDepDateChange = (e) => {
    const updatedDepDate = e.target.value;  // Get the updated departure date
  
    // Update the depdate state
    setDepdate(updatedDepDate);
  
    // Save the updated value to localStorage
    const userData = {
      depcity,
      arrcity,
      depdate: updatedDepDate,  // Updated departure date
      arrdate,
      passengers,
    };
    localStorage.setItem('userFlightData', JSON.stringify(userData));
    console.log('Data saved to local storage:', userData);
  };
  
  const handleArrDateChange = (e) => {
    const updatedArrDate = e.target.value;  // Get the updated arrival date
  
    // Update the arrdate state
    setArrdate(updatedArrDate);
  
    // Save the updated value to localStorage
    const userData = {
      depcity,
      arrcity,
      depdate,
      arrdate: updatedArrDate,  // Updated arrival date
      passengers,
    };
    localStorage.setItem('userFlightData', JSON.stringify(userData));
    console.log('Data saved to local storage:', userData);
  };
  
  const handlePassengerChange = (type, value) => {
    // Update the passengers state
    setPassengers((prev) => {
      const updatedPassengers = { ...prev, [type]: value };  // Update the specific passenger type
  
      // Save the updated value to localStorage
      const userData = {
        depcity,
        arrcity,
        depdate,
        arrdate,
        passengers: updatedPassengers,  // Updated passengers data
      };
      localStorage.setItem('userFlightData', JSON.stringify(userData));
      console.log('Data saved to local storage:', userData);
      return updatedPassengers;  // Return the updated state
    });
  };
  

  const handleCheckboxChange = () => {
    setFlexibleDates((prev) => !prev);
  };

  const handleClassButtonClick = (className) => {
    setActiveClass(className);

    const userData = {
      depcity,
      arrcity,
      depdate,
      arrdate,
      passengers,
      flightType: className, 
    }
    localStorage.setItem('userFlightData', JSON.stringify(userData));
    console.log('Data saved to local storage:', userData);
  };

  const handleSearchClick = () => {
    // You can add validation here if needed
    if (!depcity || !arrcity || !depdate) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Navigate to the flights page
    navigate('/flights');
  };

  const handleContinue = () => {
    navigate('/flights');
  };

  return (
    <div className="booking-page">
      <Navbar />
      <div className="herocont">
        <span>
          <p>Book Your Flight</p>
          <p id="purp"> with Us</p>
        </span>
        <p id="herotext">
          Simply enter your departure and destination cities, travel dates, and passenger details to browse available flights.
        </p>
      </div>

      <div className="classes">
        <button
          className={activeClass === 'one-way' ? 'active' : ''}
          onClick={() => handleClassButtonClick('one-way')}
        >
          <p>One way Flight</p>
        </button>
        <button
          className={activeClass === 'return' ? 'active' : ''}
          onClick={() => handleClassButtonClick('return')}
        >
          <p>Return Flight</p>
        </button>
        <button
          className={activeClass === 'multi-city' ? 'active' : ''}
          onClick={() => handleClassButtonClick('multi-city')}
        >
          <p>Multi-city Flight</p>
        </button>
        <button
          className={activeClass === 'round-trip' ? 'active' : ''}
          onClick={() => handleClassButtonClick('round-trip')}
        >
          <p>Round-Trip Flight</p>
        </button>
      </div>

      <div className="bookingcont">
        <div className="flex1">
          <div className="flight-form1">
            <div>
              <label>From</label>
              <select id="dc" onChange={handleDepChange} value={depcity}>
                <option value="" disabled>
                  Select Departure City
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>To</label>
              <select id="ac" onChange={handleArrChange} value={arrcity}>
                <option value="" disabled>
                  Select Arrival City
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="dropdown">
              <label id="pass1" className=".flight-form">
                Passengers
              </label>
              <button id="dpb" className="dropdown-btn">
                Passengers
              </button>
              <div className="dropdown-content">
                <div className="counter">
                  <span>Adults</span>
                  <button className="counter-btn" onClick={() => handlePassengerChange('adults', passengers.adults - 1)}>
                    -
                  </button>
                  <span>{passengers.adults}</span>
                  <button className="counter-btn" onClick={() => handlePassengerChange('adults', passengers.adults + 1)}>
                    +
                  </button>
                </div>
                <div className="counter">
                  <span id="child">Children</span>
                  <button
                    id="dec1"
                    className="counter-btn"
                    onClick={() => handlePassengerChange('children', passengers.children - 1)}
                  >
                    -
                  </button>
                  <span>{passengers.children}</span>
                  <button className="counter-btn" onClick={() => handlePassengerChange('children', passengers.children + 1)}>
                    +
                  </button>
                </div>
                <div className="counter">
                  <span>Infants</span>
                  <button
                    className="counter-btn"
                    onClick={() => handlePassengerChange('infants', passengers.infants - 1)}
                  >
                    -
                  </button>
                  <span>{passengers.infants}</span>
                  <button className="counter-btn" onClick={() => handlePassengerChange('infants', passengers.infants + 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div className="flex2">
              <div>
                <label id="dep">Departure</label>
                <input type="date" onChange={handleDepDateChange} id="depdate" value={depdate} />
              </div>

              <div>
                <label id="ret">Return</label>
                <input id="date" type="date" onChange={handleArrDateChange} value={arrdate} />
              </div>

              <div>
                <label id="cl">Flight Class</label>
                <select id="sl">
                  <option value="" disabled>
                    Select class
                  </option>
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First</option>
                </select>
              </div>
            </div>
          </div>

          <div className="checkbox-wrapper">
            <label className="checkbox-container">
              <input
                id="check"
                type="checkbox"
                checked={flexibleDates}
                onChange={handleCheckboxChange}
              />
              <span className="checkmark"></span>
              <span className="flexible-text">My travel dates are flexible (+/- 3 days)</span>
            </label>
          </div>
        </div>
      </div>

      <p className="pasdet1">Passenger Details</p>

      <div className="passenger-details">
        <div className="dropdown-container">
          <label htmlFor="adults">Adults Passenger (17+)</label>
          <select
            className="pasdet"
            id="adults"
            value={passengers.adults}
            onChange={(e) => handlePassengerChange('adults', parseInt(e.target.value))}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="dropdown-container">
          <label htmlFor="teenagers">Teenage Passenger (12-15)</label>
          <select
            className="pasdet"
            id="teenagers"
            value={passengers.teenagers}
            onChange={(e) => handlePassengerChange('teenagers', parseInt(e.target.value))}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="dropdown-container">
          <label htmlFor="children">Children Passenger (2-11)</label>
          <select
            className="pasdet"
            id="children"
            value={passengers.children}
            onChange={(e) => handlePassengerChange('children', parseInt(e.target.value))}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="dropdown-container">
          <label htmlFor="infants">Infant Passenger (under 2)</label>
          <select
            id="infants"
            value={passengers.infants}
            onChange={(e) => handlePassengerChange('infants', parseInt(e.target.value))}
          >
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
      </div>
        <button 
          className="search-button1" 
          onClick={handleSearchClick}
        >
          Search Flights
        </button>
     
        <div class="container">
        <a href="#" class="back-link">
            <span class="arrow">&#8592;</span> Back to Search Flights
        </a>
        <a href="#" class="dimensions"></a>
    </div>
    <button 
      onClick={handleContinue}
      className="continue-button"
    >
      Continue to Flights
    </button>

      {/* <Footer /> */}
    </div>
  );
};

export default Booking;
