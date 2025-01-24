import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar'
import '../design/flights.css';
import Payment from './payment';

import Footer from '../components/footer';

const Flights = () => {

  const navigate = useNavigate();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 or 24 to 12
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };




  const [flightData, setFlightData] = useState(null);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedInboundFlight, setSelectedInboundFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handlePriceSelect = (flightIndex, priceType, isReturn = false) => {
    const selectedFlightData = {
      flight: filteredFlights[0].flights[flightIndex],
      priceType,
      route: filteredFlights[0],
      isReturn,
      price: parseFloat(filteredFlights[0].flights[flightIndex].prices[priceType].replace(/,/g, ''))
    };

    console.log('Selected Flight Data:', selectedFlightData);

    if (isReturn) {
      setSelectedInboundFlight({ flightIndex, priceType });
      localStorage.setItem('selectedInboundFlight', JSON.stringify(selectedFlightData));
    } else {
      setSelectedOutboundFlight({ flightIndex, priceType });
      localStorage.setItem('selectedOutboundFlight', JSON.stringify(selectedFlightData));
    }
  };


  useEffect(() => {
    const fetchAndFilterFlights = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get stored flight search data
        const storedData = localStorage.getItem('userFlightData');
        if (!storedData) {
          throw new Error('No flight search data found');
        }

        const parsedData = JSON.parse(storedData);
        setFlightData(parsedData);
        
        // Fetch routes from API
        const response = await fetch('https://api-pi-one-37.vercel.app/routes');

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const routesData = await response.json();
        console.log('Routes Data from API:', routesData);

        // Safely access and filter the data
        if (!parsedData.depcity || !parsedData.arrcity) {
          throw new Error('Missing departure or arrival city');
        }

        // Filter flights with null checks
        const filtered = routesData.filter(route => {
          if (!route || !route.from || !route.to) return false;
          
          const fromMatch = route.from.toLowerCase() === parsedData.depcity.toLowerCase();
          const toMatch = route.to.toLowerCase() === parsedData.arrcity.toLowerCase();
          
          return fromMatch && toMatch;
        });

        console.log('Filtered Flights:', filtered);
        setFilteredFlights(filtered);
        
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterFlights();
  }, []);






  
  return (
    <div>
      <Navbar/>


<div className="hero" >
 <span className="w-[420px] mt-[192px] block ml-[80px] font-montserrat text-[30px] font-[700] leading-[36.57px] text-left">
   Conformation For <span className="text-[#4B0082] font-[700]">Booking</span>
 </span>
     <p className="text-base mt-5 h-15 w-[545px] ml-[80px] text-[#a2a2a2] font-montserrat font-[700]">
       Here, you can review your selected flights, enter passenger details, and choose from additional options like seat selection and baggage preferences.
     </p> 
 

     {filteredFlights.length > 0 ? (
          <>

 <p className="ml-[40rem] mt-[75px] font-montserrat text-[18px] font-[700] text-[#4B0082] whitespace-nowrap">
   Outbound Flights
 </p>
 <p className=" ml-[624px] mt-[-10px] whitespace-nowrap font-montserrat text-[22px] font-[700] leading-[26px]">
   {flightData.depcity} to {flightData.arrcity}
 </p>

</>
) : (
  <p></p>
)}

</div>



{/* leftbox */} 


{filteredFlights.length > 0   ? (
  <>
    {filteredFlights.map((route, index) => (

  route.flights.map((flight, fIndex) => (

 <div key={`${index}-${fIndex}`} id="fltcont" class="flex">

  <div id="fldata" class="w-[737px] min-w-[737px] h-[258px] flex shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9  mt-9 ml-[120px]">

<div className="fldata">

<p className="ml-[30px] mt-[30px] font-montserrat text-[13px] font-[600] leading-[16px] text-[#A2A2A2]">
{fIndex + 1}{fIndex === 0 ? 'st' : fIndex === 1 ? 'nd' : fIndex === 2 ? 'rd' : 'th'} Flight
</p>
<p className="ml-[30px] mt-[-16px] font-montserrat text-[15px] font-[600] text-[#222222] leading-[20px]">
  {flight.date}
</p>
<p className="font-montserrat text-[17px] font-[700] leading-[22px] text-[#A2A2A2] ml-[30px] mt-[40px] mr-[140px]">
  {route.from}
</p>
<p className="font-montserrat text-[30px] font-[700] leading-[36.57px] ml-[30px] mt-[-14px]">
  {formatTime(flight.departureTime)}
</p>
</div>


  <div  class="flex"  id="data">

<div className="bg-[url('bookplane.png')] bg-cover bg- w-[300px] h-[40px] mt-[141px] ml-[-50px]"></div>

  <div id="datainb" className="mt-[66px] ">
<p className="font-montserrat text-[17px] font-[700] leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px] mr-[129px]">{route.to}</p>
         
<p className="font-montserrat text-[30px] font-[700] leading-[36.57px] text-left ml-[30px] mt-[-14px]">
  {formatTime(flight.arrivalTime)}
</p>
</div>
 
</div>

  </div>


{/* rightbox */}

  <div id="flprice" className="w-[519px] min-w-[519px] h-[258px] mt-9 ml-6 flex pt-[60px] px-[30px] pb-[30px] shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9">
  
    <div 
      id='box' 
      className={`w-[153px] h-[145px] cursor-pointer ${
        selectedOutboundFlight?.flightIndex === fIndex && 
        selectedOutboundFlight?.priceType === 'economy' 
          ? 'selected' 
          : ''
      }`}
      onClick={() => handlePriceSelect(fIndex, 'economy')}
    >
   
    <div className="price-section">
      <p className="pt-[29px] pl-[50px] font-montserrat text-[10px] font-[600] leading-[13px] text-[#A2A2A2]">
        FROM PKR
      </p>
      <p className="ml-[30px] font-montserrat text-[22px] font-[700] leading-[26px]">
        {flight.prices.economy}
      </p>
    </div>
    <p className="font-montserrat text-[13px] font-[600] leading-[16px] text-[#0FCF08] ml-[47px] mt-[8px]">
      Economy
    </p>
    </div>
    <div 
      id='box' 
      className={`w-[153px] h-[145px] cursor-pointer ${
        selectedOutboundFlight?.flightIndex === fIndex && 
        selectedOutboundFlight?.priceType === 'business' 
          ? 'selected' 
          : ''
      }`}
      onClick={() => handlePriceSelect(fIndex, 'business')}
    >
    <div className="price-section">
      <p className="pt-[29px] pl-[50px] font-montserrat text-[10px] font-[600] leading-[13px] text-[#A2A2A2]">
        FROM PKR
      </p>
      <p className="ml-[30px] font-montserrat text-[22px] font-[700] leading-[26px]">
        {flight.prices.business}
      </p>
    </div>
    <p className="font-montserrat text-[13px] font-[600] leading-[16px] text-[#0FCF08] ml-[47px] mt-[8px]">
      Business
    </p>
    </div>

    <div 
      id='box' 
      className={`w-[153px] h-[145px] cursor-pointer ${
        selectedOutboundFlight?.flightIndex === fIndex && 
        selectedOutboundFlight?.priceType === 'first' 
          ? 'selected' 
          : ''
      }`}
      onClick={() => handlePriceSelect(fIndex, 'first')}
    >
    <div className="price-section">
      <p className="pt-[29px] pl-[50px] font-montserrat text-[10px] font-[600] leading-[13px] text-[#A2A2A2]">
        FROM PKR
      </p>
      <p className="ml-[30px] font-montserrat text-[22px] font-[700] leading-[26px]">
        {flight.prices.first}
      </p>
    </div>
    <p className="font-montserrat text-[13px] font-[600] leading-[16px] text-[#0FCF08] ml-[67px] mt-[8px]">
      First
    </p>
    </div>
 </div>
 </div>

     ))
    ))}
  </>
) : (
  < p className="ml-[31rem] mt-[75px] p-[20px] text-[1.7rem]  font-bold text-[black] whitespace-nowrap    max-sm:text-[20px] max-sm:ml-[200px]  max-sm:mr-[200px] " >No flights found for your selected route.</p>
)}





{/* Inbound */}

{filteredFlights.length > 0  && flightData.flightType === "return" ? (
  <>
    {/* Inbound Flight Header */}
    <p className="ml-[40rem] mt-[75px] font-montserrat text-[18px] font-[700] text-[#4B0082] whitespace-nowrap max-sm:text-[20px] max-sm:ml-[200px] max-sm:mr-[200px]">
      Inbound Flights
    </p>
    <p className="ml-[624px] mt-[-10px] font-montserrat text-[22px] font-[700] leading-[26px] decoration-skip-ink max-sm:text-[1.4rem] max-sm:ml-[120px] max-sm:mr-[120px]">
      {flightData.arrcity} to {flightData.depcity}
    </p>
  </>
) : (
  <p></p>
)}




 {filteredFlights.length > 0 && flightData.flightType === "return" ? (
  <>
    {filteredFlights.map((route, index) => (
      route.returnFlights && route.returnFlights.length > 0 && (
        <div key={index} className="mt-10">
          {route.returnFlights.map((returnFlight, rIndex) => (
            <div key={rIndex} className="flex mt-6">

              {/* Return Flight Box */}
              <div id="fldata" className="w-[737px] min-w-[737px] h-[258px] flex shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9 mt-9 ml-[120px]">
                <div className="fldata">
                  <p className="ml-[30px] mt-[30px] font-montserrat text-[13px] font-[600] leading-[16px] text-[#A2A2A2]">
                  {rIndex + 1}{rIndex === 0 ? 'st' : rIndex === 1 ? 'nd' : rIndex === 2 ? 'rd' : 'th'}  Flight
                  </p>
                  <p className="ml-[30px] mt-[-16px] font-montserrat text-[15px] font-[600] text-[#222222] leading-[20px]">
                    {returnFlight.date}
                  </p>
                  <p className="font-montserrat text-[17px] font-[700] leading-[22px] text-[#A2A2A2] ml-[30px] mt-[40px] mr-[140px]">
                    {route.to}
                  </p>
                  <p className="font-montserrat text-[30px] font-[700] leading-[36.57px] ml-[30px] mt-[-14px]">
                    {formatTime(returnFlight.departureTime)}
                  </p>
                </div>

                <div className="flex" id="data">
                  <div className="bg-[url('bookplane.png')] bg-cover w-[300px] h-[40px] mt-[141px] ml-[-50px]"></div>

                  <div id="datainb" className="mt-[66px]">
                    <p className="font-montserrat text-[17px] font-[700] leading-[22px] text-[#A2A2A2] ml-[30px] mt-[40px] mr-[129px]">
                      {route.from}
                    </p>
                    <p className="font-montserrat text-[30px] font-[700] leading-[36.57px] ml-[30px] mt-[-14px]">
                      {formatTime(returnFlight.arrivalTime)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Return Flight Prices */}
              <div id="flprice" className="w-[519px] min-w-[519px] h-[258px] mt-9 ml-6 flex pt-[60px] px-[30px] pb-[30px] shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9">
                <div 
                  id="box" 
                  className={`w-[153px] h-[145px] cursor-pointer ${
                    selectedInboundFlight?.flightIndex === rIndex && 
                    selectedInboundFlight?.priceType === 'economy' 
                      ? 'selected' 
                      : ''
                  }`}
                  onClick={() => handlePriceSelect(rIndex, 'economy', true)}
                >
                  <div className="price-section">
                    <p className="pt-[29px] pl-[50px] font-montserrat text-[10px] font-[600] leading-[13px] text-[#A2A2A2]">
                      FROM PKR
                    </p>
                    <p className="ml-[30px] font-montserrat text-[22px] font-[700] leading-[26px]">
                      {returnFlight.prices.economy}
                    </p>
                  </div>
                  <p className="font-montserrat text-[13px] font-[600] leading-[16px] text-[#0FCF08] ml-[47px] mt-[8px]">
                    Economy
                  </p>
                </div>
                <div 
                  id="box" 
                  className={`w-[153px] h-[145px] cursor-pointer ${
                    selectedInboundFlight?.flightIndex === rIndex && 
                    selectedInboundFlight?.priceType === 'business' 
                      ? 'selected' 
                      : ''
                  }`}
                  onClick={() => handlePriceSelect(rIndex, 'business', true)}
                >
                  <div className="price-section">
                    <p className="pt-[29px] pl-[50px] font-montserrat text-[10px] font-[600] leading-[13px] text-[#A2A2A2]">
                      FROM PKR
                    </p>
                    <p className="ml-[30px] font-montserrat text-[22px] font-[700] leading-[26px]">
                      {returnFlight.prices.business}
                    </p>
                  </div>
                  <p className="font-montserrat text-[13px] font-[600] leading-[16px] text-[#0FCF08] ml-[47px] mt-[8px]">
                    Business
                  </p>
                </div>

                <div 
                  id='box' 
                  className={`w-[153px] h-[145px] cursor-pointer ${
                    selectedInboundFlight?.flightIndex === rIndex && 
                    selectedInboundFlight?.priceType === 'first' 
                      ? 'selected' 
                      : ''
                  }`}
                  onClick={() => handlePriceSelect(rIndex, 'first', true)}
                >
                  <div className="price-section">
                    <p className="pt-[29px] pl-[50px] font-montserrat text-[10px] font-[600] leading-[13px] text-[#A2A2A2]">
                      FROM PKR
                    </p>
                    <p className="ml-[30px] font-montserrat text-[22px] font-[700] leading-[26px]">
                      {returnFlight.prices.first}
                    </p>
                  </div>
                  <p className="font-montserrat text-[13px] font-[600] leading-[16px] text-[#0FCF08] ml-[67px] mt-[8px]">
                    First
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    ))}
  </>
) : (
  <p></p>
)}






{/* conditions */}





<div className="container">
        <button 
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/booking';
          }}
          className="back-link font-montserrat text-[13px] font-[600] text-gray-600"
        >
          <span className="arrow">&#8592;</span> Back to Search Flights
        </button>
        <button 
          onClick={handleContinueClick}
          className="next-button1 font-montserrat text-[13px] font-[600]"
        >
          Continue To Next Step
        </button>
    </div>

    <Footer/>
    </div>

  )
}

const handleContinueClick = () => {
  const outboundFlight = localStorage.getItem('selectedOutboundFlight');
  const inboundFlight = localStorage.getItem('selectedInboundFlight');
  const flightData = JSON.parse(localStorage.getItem('userFlightData'));

  if (!outboundFlight) {
    alert('Please select an outbound flight');
    return;
  }

  if (flightData?.flightType === "return" && !inboundFlight) {
    alert('Please select a return flight');
    return;
  }

  // Direct navigation to confirm page
  window.location.href = '/confirmation';
};

export default Flights
