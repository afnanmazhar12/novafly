import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const landing = () => {
  const navigate = useNavigate();

  // const [data, setdata] = useState([])
  const [cities, setcities] = useState([])

  const [depcity, setdepcity] = useState("");
  const [arrcity, setarrcity] = useState("")
  const [depdate, setdepdate] = useState("")
  const [arrdate, setarrdate] = useState("")
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });



  const fetchData = async () => {
    try {
      const response = await fetch('https://api-pi-one-37.vercel.app/cities');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setcities(data);

      console.log(data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [activeClass, setActiveClass] = useState("");


  const saveToLocalStorage = () => {
    const userData = {
      depcity,
      arrcity,
      depdate,
      arrdate,
      passengers,
    };
    localStorage.setItem("userFlightData", JSON.stringify(userData));
    console.log("Data saved to local storage:", userData);
  };



  const handleDepChange = (e) => {
    setdepcity(e.target.value);
    console.log("dep city: ", e.target.value);
    saveToLocalStorage();
  };



  const handlearrchange = (e) => {
    setarrcity(e.target.value);
    console.log("arr city: ", e.target.value);
    saveToLocalStorage();
  };


  const handleDepdate = (e) => {
    setdepdate(e.target.value);
    console.log("dep date", e.target.value);
    saveToLocalStorage();
  };




  const handleArrdate = (e) => {
    setarrdate(e.target.value);
    console.log("arr date: ", e.target.value);
    saveToLocalStorage();
  };



  const increase = (type) => {
    setPassengers((prev) => {
      const updatedPassengers = { ...prev, [type]: prev[type] + 1 };
      console.log(`Updated ${type}: `, updatedPassengers);
      saveToLocalStorage();
      return updatedPassengers;
    });
  };

  const decrease = (type) => {
    setPassengers((prev) => {
      const updatedPassengers = {
        ...prev,
        [type]: prev[type] > 0 ? prev[type] - 1 : 0
      };
      console.log(`Updated ${type}: `, updatedPassengers);
      saveToLocalStorage();
      return updatedPassengers;
    });
  };

  const handleClassButtonClick = (className) => {
    setActiveClass(className);
  };

  const handleSearch = () => {
    saveToLocalStorage();
    navigate('/booking'); // Navigate to booking page
  };

  return (
    <div>
      <Navbar />
      <div className="text">
        <p>More Than Just a Flight It's </p>
        <p id='hea'>Your Journey</p>
      </div>
      <div className="map"></div>

      {/* flightbar */}

      <div className="book">
        <div className="flight-classes">
          <button
            className={`class-button ${activeClass === "first-class" ? "active" : ""}`}
            onClick={() => handleClassButtonClick("first-class")}
          >
            First Class
          </button>
          <button
            className={`class-button ${activeClass === "economy-class" ? "active" : ""}`}
            onClick={() => handleClassButtonClick("economy-class")}
          >
            Economy Class
          </button>
          <button
            className={`class-button ${activeClass === "business-class" ? "active" : ""}`}
            onClick={() => handleClassButtonClick("business-class")}
          >
            Business Class
          </button>
        </div>

        <div className="flight-form">
          <div>
            <label>From</label>
            <select id='depch' onChange={handleDepChange} >
            
              <option value="" disabled selected >
               Select Departure City

              </option>
              {cities.map(city => (
                <option key={city} value={city} >
                  {city}
                </option>
              ))}

            </select>

          </div>

          <div>
            <label>To</label>

            <select id='arrch' onChange={handlearrchange}>
              <option value="" disabled selected>
                Select Arrival City
              </option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>




          </div>

          <div>
            <label  >Departure</label>
            <input id='depd' type="date" onChange={handleDepdate} />
          </div>

          <div>
            <label id='ret'>Return</label>
            <input id='date' type="date" onChange={handleArrdate} />
          </div>

          <div>

          </div>
          <div className="dropdown">
            <label id='pass1' className=".flight-form">Passengers</label>
            <button className="dropdown-btn">Passengers</button>
            <div className="dropdown-content">
              <div className="counter">
                <span>Adults</span>
                <button className="counter-btn" onClick={() => decrease('adults')}>-</button>
                <span>{passengers.adults}</span>
                <button className="counter-btn" onClick={() => increase('adults')}>+</button>
              </div>
              <div className="counter">
                <span id='child'>Children</span>
                <button id='dec1' className="counter-btn" onClick={() => decrease('children')}>-</button>
                <span>{passengers.children}</span>
                <button className="counter-btn" onClick={() => increase('children')}>+</button>
              </div>
              <div className="counter">
                <span>Infants</span>
                <button className="counter-btn" onClick={() => decrease('infants')}>-</button>
                <span>{passengers.infants}</span>
                <button className="counter-btn" onClick={() => increase('infants')}>+</button>
              </div>
            </div>
          </div>





          <button 
            type="submit" 
            className="search-button" 
            onClick={handleSearch}
          >
            Search Now
          </button>
        </div>
      </div>



      {/* dest */}

      <div className="desttext">
        <p id='pop'>Popular</p>
        <p id='choose'> Destinations Worldwide</p>
      </div>

      <div className="destcont">
        <div className="destcardl">
          <div className="destimgl"></div>
          <div className="desttextl">
            <p id='can' >Canada</p>
            <p id='tor'>Toronto</p>
            <div className='dest1'>
              <p className='mon1' > $100</p>
              <p className='mon2'>$125</p>
              <button className='signup-button' id='destbtn'>Book Now</button>
            </div>
          </div>
        </div>
        <div className="destcardr">
          <div class="card dubai">
            <div class="card-image"></div>
            <div class="card-content">
              <div class="card-header">
                <p class="country">UNITED ARAB EMIRATES</p>
                <p class="brand">✈️ NovaFly</p>
              </div>
              <h2 class="destination">Dubai</h2>
              <div class="price">
                <span class="current-price">$100</span>
                <span class="original-price">$125</span>
                <button class="destbtn">Book Now</button>
              </div>
            </div>
          </div>

          <div class="card paris">
            <div class="card-image"></div>
            <div class="card-content">
              <div class="card-header">
                <p class="country">FRANCE</p>
                <p class="brand">✈️ NovaFly</p>
              </div>
              <h2 class="destination">Paris</h2>
              <div class="price">
                <span class="current-price">$100</span>
                <span class="original-price">$125</span>
              </div>
              <button class="destbtn1">Book Now</button>
            </div>
          </div>

          <div class="card bangkok">
            <div class="card-image"></div>
            <div class="card-content">
              <div class="card-header">
                <p class="country">THAILAND</p>
                <p class="brand">✈️ NovaFly</p>
              </div>
              <h2 class="destination">Bangkok</h2>
              <div class="price">
                <span class="current-price">$100</span>
                <span class="original-price">$125</span>
              </div>
              <button class="destbtn1">Book Now</button>
            </div>
          </div>

        </div>
      </div>




      {/* choose */}


      <div className="choose">
        <div className="info">
          <p>Why </p>
          <p id='choose'>  Choose Us ?</p>
        </div>
        <div className="info2">
          <p>At NovaFly, we redefine the flight booking experience to make your journey exceptional. Here's why discerning travelers chose us</p>
        </div>


        <div className="about-container">
          <div className="cardcont">
            {/* <div className="cards">
    
    </div>
   */}

            <div className="cards">
              <p id='h'>24/7 Customer Support</p>
              <p>We understand that plans can change, so we offer options to modify or cancel your booking with ease. Whether you need a refund or want to reschedule</p>
            </div>

            <div className="cards">
              <p id='h'>Seamless Booking Experience</p>
              <p>We understand that plans can change, so we offer options to modify or cancel your booking with ease. Whether you need a refund or want to reschedule</p>
            </div>

            <div className="cards">
              <p id='h'>Affordable Pricing</p>
              <p>We understand that plans can change, so we offer options to modify or cancel your booking with ease. Whether you need a refund or want to reschedule</p>
            </div>

            <div className="cards">

              <p id='h'>Flexible cancellations </p>
              <p>We understand that plans can change, so we offer options to modify or cancel your booking with ease. Whether you need a refund or want to reschedule</p>
            </div>

          </div>

          <div className="wing"> </div>
        </div>
      </div>




      {/* Testimonials */}


      <div className="testicont">

        <div className="testitext">


          <div className="testimg1">
            <p id='testi'>Testimonials</p>
            <p id='head'>What They say </p>

            <p id="head">
              About <span className="purple-text">Our Services</span>
            </p>


            <p id='para'>"The experience of booking airfare through this website was amazing! The intuitive interface, wide selection of routes, and fast transaction process made my trip more enjoyable."</p>
            <p id='dani'>Daniel Ricciardo</p>
            <p id='bus'>Businessman</p>

          </div>



        </div>

        <div className="testimg"></div>
      </div>




      <div class="flight-card">
        <div class="content">
          <h1>Ready to Take a Flight around the <span>World with us?</span></h1>
          <p>Ready to embark on your next journey? Discover seamless booking, flexible options, and exceptional service—all in one place.</p>
          <button>Book Your Flight</button>
        </div>
        <div class="image">
          {/* <img src="your-image-url.jpg" alt="Airplane wing view"> */}
        </div>
      </div>




      <Footer />
    </div>
  )
}

export default landing
