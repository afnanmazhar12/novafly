import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar'
import '../design/flights.css';

import Footer from '../components/footer';

const flights = () => {


  const [flightData, setFlightData] = useState(null);
const [filteredFlights, setFilteredFlights] = useState([]);

useEffect(() => {
  const fetchAndFilterFlights = async () => {
    const storedData = localStorage.getItem('userFlightData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFlightData(parsedData);
      console.log('Retrieved Flight Data:', parsedData);

      try {
        // Fetch routes from the API
        const response = await fetch('https://api-pi-one-37.vercel.app/routes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const routesData = await response.json();
        console.log('Routes Data from API:', routesData);

        // Normalize the departure and arrival city to lowercase for matching
        const depCity = parsedData.depcity.trim().toLowerCase();
        const arrCity = parsedData.arrcity.trim().toLowerCase();
        const depDate = parsedData.depdate.trim(); // Ensure it's a string for direct comparison
        console.log('Normalized Departure City:', depCity);
        console.log('Normalized Arrival City:', arrCity);
        console.log('Normalized Departure Date:', depDate);

        // Filter the routes based on localStorage data
        const matchedFlights = routesData.filter((route) => {
      
          const fromMatch = route.from.trim().toLowerCase() === depCity;
          const toMatch = route.to.trim().toLowerCase() === arrCity;

          // Check if at least one flight's date matches
          const dateMatch = route.flights.some((flight) => {
            const flightDate = flight.date.trim(); // Ensure it's a string
            console.log('Checking flight date:', flightDate);
            return flightDate === depDate; // Compare as strings
          });

          // Return true if both city and date match
          return fromMatch && toMatch && dateMatch;
        });

        setFilteredFlights(matchedFlights);
        console.log('Filtered Flights:', matchedFlights);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    } else {
      console.log('No flight data found in localStorage');
    }
  };

  fetchAndFilterFlights();
}, []);



  
  return (
    <div>
      <Navbar/>


<div className="hero" >
 <span class=" w-[517px] min-w-[517px]  mt-10 block ml-20 font-montserrat text-[30px] font-bold leading-[36.57px] text-left custom-underline    max-sm:text-[30px] max-sm:w-[300px]  max-sm:ml-10 max-sm:mr-10 max-sm:pt-5 max-sm:pr-10 max-sm:pl-10"   >Make Your Booking <span class="text-[#4B0082] font-bold"> Simpler</span></span>
     <p  class="text-base  mt-5 h-15 w-[545px] ml-20 text-[#a2a2a2]  font-semibold  max-sm:text-[1.35rem] max-sm:pl-9 max-sm:pr-0 max-sm:ml-[13px] max-sm:whitespace-pre-wrap " >Here, you can review your selected flights, enter passenger details, and choose from additional options like seat selection and baggage preferences.</p> 
 

     {filteredFlights.length > 0 ? (
          <>

 <p class="ml-[40rem] mt-[75px] text-lg font-semibold text-[#4B0082] whitespace-nowrap    max-sm:text-[20px] max-sm:ml-[200px]  max-sm:mr-[200px]   "  >Outbound Flights</p>
 <p class=" ml-[564px] mt-[-10px]   whitespace-nowrap font-montserrat text-[22px] font-bold leading-[26px]  decoration-skip-ink   max-sm:text-[1.4rem] max-sm:ml-[120px]  max-sm:mr-[120px] "   > {flightData.depcity} to {flightData.arrcity}</p>

</>
) : (
  <p>No flights found for your selected route.</p>
)}

</div>



{/* leftbox */}




 <div id="fltcont" class="flex">

  <div id="fldata" class="w-[737px] min-w-[737px] h-[258px] flex shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9  mt-9 ml-20">

<div className="fldata">

<p class="ml-[30px] mt-[30px] font-montserrat text-[13px] font-semibold leading-[16px] text-[#A2A2A2] text-left">1st Flight</p>
<p class="ml-[30px] mt-[-16px] font-montserrat text-[15px] font-semibold text-[#222222] leading-[20px] text-left">Tuesday, 12 November 2024</p>
<p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">LHE</p>
<p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> 03:20 AM</p>
</div>


  <div  class="flex"  id="data">

<div className="bg-[url('bookplane.png')] bg-cover bg- w-[300px] h-[40px] mt-[141px] ml-[-50px]"></div>

  <div id="datainb" class= "mt-[66px] ">
<p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">STN</p>
<p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> 03:20 AM</p>
</div>
</div>
</div>


{/* rightbox */}

  <div id="flprice" class="w-[519px] min-w-[519px] h-[258px] mt-9 ml-6 flex pt-[60px] px-[30px] pb-[30px] shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9">
  
    <div id='box' class="w-[153px] h-[145px] ">
   
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[47px] mt-[8px]">Economy</p>
    </div>
    <div id='box' class="w-[153px] h-[145px]">
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[47px] mt-[8px]">Business</p>
    </div>

    <div  class="w-[153px] h-[145px] ">
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[67px] mt-[8px]">First</p>
    </div>
 </div>
 </div>





 <div id="fltcont" class="flex">

  <div id="fldata" class="w-[737px] min-w-[737px] h-[258px] flex shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9  mt-9 ml-20">

<div className="fldata">

<p class="ml-[30px] mt-[30px] font-montserrat text-[13px] font-semibold leading-[16px] text-[#A2A2A2] text-left">1st Flight</p>
<p class="ml-[30px] mt-[-16px] font-montserrat text-[15px] font-semibold text-[#222222] leading-[20px] text-left">Tuesday, 12 November 2024</p>
<p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">LHE</p>
<p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> 03:20 AM</p>
</div>


  <div  class="flex"  id="data">

<div className="bg-[url('bookplane.png')] bg-cover bg- w-[300px] h-[40px] mt-[141px] ml-[-50px]"></div>

  <div id="datainb" class= "mt-[66px] ">
<p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">STN</p>
<p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> 03:20 AM</p>
</div>
 
</div>

  </div>


{/* rightbox */}

  <div id="flprice" class="w-[519px] min-w-[519px] h-[258px] mt-9 ml-6 flex pt-[60px] px-[30px] pb-[30px] shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9">
  
    <div id='box' class="w-[153px] h-[145px] ">
   
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[47px] mt-[8px]">Economy</p>
    </div>
    <div id='box' class="w-[153px] h-[145px]">
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[47px] mt-[8px]">Business</p>
    </div>

    <div  class="w-[153px] h-[145px] ">
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[67px] mt-[8px]">First</p>
    </div>
 </div>
 </div>




{/* Inbound */}
 <p class="ml-[40rem] mt-[45px] text-lg font-semibold text-[#4B0082] whitespace-nowrap    max-sm:text-[20px] max-sm:ml-[200px]  max-sm:mr-[200px]   "  >Inbound Flights</p>
 <p class=" ml-[564px] mt-[-10px]   whitespace-nowrap font-montserrat text-[22px] font-bold leading-[26px]  decoration-skip-ink   max-sm:text-[1.4rem] max-sm:ml-[120px]  max-sm:mr-[120px] "   >Lahore to London Stansted</p>







 <div id="fltcont" class="flex">

  <div id="fldata" class="w-[737px] min-w-[737px] h-[258px] flex shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9  mt-9 ml-20">

<div className="fldata">

<p class="ml-[30px] mt-[30px] font-montserrat text-[13px] font-semibold leading-[16px] text-[#A2A2A2] text-left">1st Flight</p>
<p class="ml-[30px] mt-[-16px] font-montserrat text-[15px] font-semibold text-[#222222] leading-[20px] text-left">Tuesday, 12 November 2024</p>
<p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">LHE</p>
<p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> 03:20 AM</p>
</div>


  <div  class="flex"  id="data">

<div className="bg-[url('bookplane.png')] bg-cover bg- w-[300px] h-[40px] mt-[141px] ml-[-50px]"></div>

  <div id="datainb" class= "mt-[66px] ">
<p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">STN</p>
<p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> 03:20 AM</p>
</div>
 
</div>

  </div>


{/* rightbox */}

  <div id="flprice" class="w-[519px] min-w-[519px] h-[258px] mt-9 ml-6 flex pt-[60px] px-[30px] pb-[30px] shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9">
  
    <div id='box' class="w-[153px] h-[145px] ">
   
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[47px] mt-[8px]">Economy</p>
    </div>
    <div id='box' class="w-[153px] h-[145px]">
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[47px] mt-[8px]">Business</p>
    </div>

    <div  class="w-[153px] h-[145px] ">
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[67px] mt-[8px]">First</p>
    </div>
 </div>
 </div>



 <div id="fltcont" class="flex">

  <div id="fldata" class="w-[737px] min-w-[737px] h-[258px] flex shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9  mt-9 ml-20">

<div className="fldata">

<p class="ml-[30px] mt-[30px] font-montserrat text-[13px] font-semibold leading-[16px] text-[#A2A2A2] text-left">1st Flight</p>
<p class="ml-[30px] mt-[-16px] font-montserrat text-[15px] font-semibold text-[#222222] leading-[20px] text-left">Tuesday, 12 November 2024</p>
<p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">LHE</p>
<p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> 03:20 AM</p>
</div>


  <div  class="flex"  id="data">

<div className="bg-[url('bookplane.png')] bg-cover bg- w-[300px] h-[40px] mt-[141px] ml-[-50px]"></div>

  <div id="datainb" class= "mt-[66px] ">
<p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">STN</p>
<p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> 03:20 AM</p>
</div>
 
</div>

  </div>


{/* rightbox */}

  <div id="flprice" class="w-[519px] min-w-[519px] h-[258px] mt-9 ml-6 flex pt-[60px] px-[30px] pb-[30px] shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9">
  
    <div id='box' class="w-[153px] h-[145px] ">
   
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[47px] mt-[8px]">Economy</p>
    </div>
    <div id='box' class="w-[153px] h-[145px]">
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[47px] mt-[8px]">Business</p>
    </div>

    <div  class="w-[153px] h-[145px] ">
    <p class="pt-[29px] pl-[50px] font-montserrat text-[10px] font-semibold leading-[13px] text-left text-[#A2A2A2]">FROM PKR</p>
    <p class=" ml-[30px]  font-montserrat text-[22px] font-bold leading-[26px] text-left">275, 000</p>
     <p class="font-montserrat text-[13px] font-semibold leading-[16px] text-[#0FCF08] text-left ml-[67px] mt-[8px]">First</p>
    </div>
 </div>
 </div>


   
 {filteredFlights.length > 0 ? (
        <div className="flex">
          {filteredFlights.map((flight, index) => (
            <div key={index} className="w-[737px] min-w-[737px] h-[258px] flex shadow-[0px_4px_50px_0px_#0000001A] rounded-[20px] opacity-100 z-9 mt-9 ml-20">
              <div className="fldata">
              <p class="ml-[30px] mt-[30px] font-montserrat text-[13px] font-semibold leading-[16px] text-[#A2A2A2] text-left">{index + 1}</p>
 <p class="ml-[30px] mt-[-16px] font-montserrat text-[15px] font-semibold text-[#222222] leading-[20px] text-left">{flight.date}</p>
 <p  class="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">{flight.from}</p>
 <p class=" font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]"> {flight.time}</p>
              </div>
              <div className="flex">
                <div className="bg-[url('bookplane.png')] bg-cover w-[300px] h-[40px] mt-[141px] ml-[-50px]"></div>
                <div id="datainb" className="mt-[66px]">
                  <p className="font-montserrat text-[17px] font-bold leading-[22px] text-[#A2A2A2] text-left ml-[30px] mt-[40px]">{flight.to}</p>
                  <p className="font-montserrat text-[30px] font-bold leading-[36.57px] text-left ml-[30px] mt-[-14px]">{flight.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

 

{/* conditions */}





<div id='cond'>
 
<p class="font-montserrat text-[17px] font-bold leading-[22px] text-left mt-[80px] ml-[80px] text-[#000000]">Fare Conditions</p>
<p   class="ml-[80px] mt-[26px] font-montserrat text-[15px] font-semibold leading-[20px] text-left text-[#A2A2A2]">  <span class="font-montserrat text-[15px] font-semibold leading-[20px] text-left text-[#4B0082]">Note: </span>Upgrade prices and seat selection are only applicable to NovaFly operated flights.</p>

<p   class="ml-[80px] mt-[16px] font-montserrat text-[15px] font-semibold leading-[20px] text-left text-[#A2A2A2]">  <span class="font-montserrat text-[15px] font-semibold leading-[20px] text-left text-[#4B0082]">Important: </span> Change fees will be charged in addition to any applicable fare difference.</p>

<p   class="w-[1091px] h-[40px] ml-[80px] mt-[16px] font-montserrat text-[15px] font-semibold leading-[20px] text-left text-[#A2A2A2]"> The amounts quoted for refunds, change fees, Miles earned or upgrades are per person. Upgrades with Miles are subject to availability on NovaFly operated flights only.</p>

</div>










<div class="container">
        <a href="#" class="back-link">
            <span class="arrow">&#8592;</span> Back to Search Flights
        </a>
        <a href="#" class="dimensions"></a>
    </div>
    <button class="next-button1">continue to next step</button>

    <Footer/>
    </div>

  )
}


export default flights
