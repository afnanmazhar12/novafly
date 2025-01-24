import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ArrowLine = () => (
  <div className="relative w-full flex items-center justify-center">
    <div className="h-[1px] bg-gray-200 w-full"></div>
    <svg className="absolute right-[-2px]" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 12H20L14 6M20 12L14 18" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const Confirm = () => {
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedInbound, setSelectedInbound] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Format time helper function
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Function to safely parse price
  const parsePriceValue = (price) => {
    if (!price) return 0;
    return parseFloat(price.toString().replace(/,/g, '')) || 0;
  };

  // Function to format price with commas
  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '0';
    return price.toLocaleString('en-US');
  };

  // Calculate total price
  const calculateTotalPrice = (outbound, inbound) => {
    const outboundPrice = outbound ? parsePriceValue(outbound.price) : 0;
    const inboundPrice = inbound ? parsePriceValue(inbound.price) : 0;
    return outboundPrice + inboundPrice;
  };

  useEffect(() => {
    try {
      const outboundData = localStorage.getItem('selectedOutboundFlight');
      const inboundData = localStorage.getItem('selectedInboundFlight');

      let outbound = null;
      let inbound = null;

      if (outboundData) {
        outbound = JSON.parse(outboundData);
        setSelectedOutbound(outbound);
      }
      if (inboundData) {
        inbound = JSON.parse(inboundData);
        setSelectedInbound(inbound);
      }

      const total = calculateTotalPrice(outbound, inbound);
      setTotalPrice(total);
    } catch (error) {
      console.error('Error loading flight data:', error);
    }
  }, []);

  const benefits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9.5C9.98 3 10.44 3.21 10.73 3.56L12 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H14.5C14.02 21 13.56 20.79 13.27 20.44L12 19H5" 
            stroke="#4B0082" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      value: "35KG",
      label: "Baggage Allowance"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5H4C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5Z" 
            stroke="#4B0082" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      value: "Regular",
      label: "Seat Selection"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="#4B0082" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      value: "Economy",
      label: "Class Dining"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8H10V14H14V8Z M20 8H16V14H20V8Z M8 8H4V14H8V8Z" 
            stroke="#4B0082" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      value: "Regular",
      label: "In flight Entertainment"
    }
  ];

  // Add this function to handle navigation
  const handleContinueClick = () => {
    window.location.href = '/payment';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1280px] mx-auto px-[60px] pt-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="w-[420px] block ml-[0px] font-montserrat text-[30px] font-[700] leading-[36.57px] text-left">
              Conformation For <span className="text-[#4B0082]">Booking</span>
            </h1>
            <p className="text-[13px] text-gray-500 mt-2 max-w-[450px] leading-[1.4]">
              This stage allows you to review all important details before finalizing your booking. Please ensure all information is accurate, as some changes may not be possible later.
            </p>
          </div>
          <button className="bg-[#4B0082] text-white text-[13px] px-4 py-2 rounded">
            View Trip Summary
          </button>
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <h2 className="text-center text-[16px] font-medium">Benefits For Your Flight</h2>
          <p className="text-center text-[13px] text-gray-500 mt-2 mb-10">
            Your included benefits depend on your selected class and fare and your membership tier. Click on any of the cards for more information.
          </p>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-4 gap-16 max-w-[1000px] mx-auto mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <div className="text-[16px] font-semibold text-black">
                  {benefit.value}
                </div>
                <div className="text-[13px] text-gray-500 mt-1">
                  {benefit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade Section */}
          <div>
            <h2 className="text-[16px] font-medium mb-2">
              Upgrade Your Flight To <span className="text-[#4B0082]">Economy Flex</span>
            </h2>
            <p className="text-[13px] text-gray-500 mb-8">
              Enjoy our highest level of service with added extras benefits for your flight plus more flexibility.
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8 max-w-[1280px] mx-auto px-[60px]">
              <div className="rounded-lg overflow-hidden shadow-sm relative">
                <img 
                  src="/image.png"
                  alt="Seat Selection"
                  className="w-full h-[180px] object-cover brightness-[0.8]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-[18px] font-montserrat font-[700] text-white">Seat Selection</h3>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm relative">
                <img 
                  src="/mile.png"
                  alt="Miles Upgrade"
                  className="w-full h-[180px] object-cover brightness-[0.8]"
                />
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-[18px] font-montserrat font-[700] text-white">Miles Upgrade</h3>
                </div> */}
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm relative">
                <img 
                  src="/flex.png"
                  alt="More Flexibility"
                  className="w-full h-[180px] object-cover brightness-[0.8]"
                />
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-[18px] font-montserrat font-[700] text-white">More Flexibility</h3>
                </div> */}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="max-w-[1280px] mx-auto px-[60px]">
              <div className="bg-[#FFFFFF] rounded-[15px] p-6" style={{
                boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.09)',
              }}>
                {/* Outbound Flight */}
                {selectedOutbound && (
                  <div className="flex items-center mb-6">
                    <div className="flex-1 pr-10">
                      <div className="text-[13px] text-gray-400 mb-2">Outbound Flight</div>
                      <div className="flex items-center gap-4">
                        <span className="text-[15px]">
                          {selectedOutbound.route.from} <span className="text-gray-500">({selectedOutbound.route.from.slice(0, 3).toUpperCase()})</span>
                        </span>
                        <div className="flex-1 relative px-4">
                          <ArrowLine />
                        </div>
                        <span className="text-[15px]">
                          {selectedOutbound.route.to} <span className="text-gray-500">({selectedOutbound.route.to.slice(0, 3).toUpperCase()})</span>
                        </span>
                      </div>
                      <div className="text-[13px] text-gray-400 mt-2">
                        {selectedOutbound.flight.date} - {formatTime(selectedOutbound.flight.departureTime)} to {formatTime(selectedOutbound.flight.arrivalTime)}
                      </div>
                    </div>
                    <div className="w-[1px] h-14 bg-gray-100"></div>
                    <div className="flex items-center justify-between pl-10 w-[320px]">
                      <div>
                        <div className="text-[13px] text-gray-400 mb-1">Amount Fee</div>
                        <div className="text-[15px]">{selectedOutbound.price.toLocaleString()} PKR</div>
                      </div>
                      <button className="bg-[#4B0082] text-white text-[13px] px-4 py-1.5 rounded">
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                )}

                {/* Return Flight */}
                {selectedInbound && (
                  <div className="flex items-center mb-6">
                    <div className="flex-1 pr-10">
                      <div className="text-[13px] text-gray-400 mb-2">Inbound Flight</div>
                      <div className="flex items-center gap-4">
                        <span className="text-[15px]">
                          {selectedInbound.route.from} <span className="text-gray-500">({selectedInbound.route.from.slice(0, 3).toUpperCase()})</span>
                        </span>
                        <div className="flex-1 relative px-4">
                          <ArrowLine />
                        </div>
                        <span className="text-[15px]">
                          {selectedInbound.route.to} <span className="text-gray-500">({selectedInbound.route.to.slice(0, 3).toUpperCase()})</span>
                        </span>
                      </div>
                      <div className="text-[13px] text-gray-400 mt-2">
                        {selectedInbound.flight.date} - {formatTime(selectedInbound.flight.departureTime)} to {formatTime(selectedInbound.flight.arrivalTime)}
                      </div>
                    </div>
                    <div className="w-[1px] h-14 bg-gray-100"></div>
                    <div className="flex items-center justify-between pl-10 w-[320px]">
                      <div>
                        <div className="text-[13px] text-gray-400 mb-1">Amount Fee</div>
                        <div className="text-[15px]">{selectedInbound.price.toLocaleString()} PKR</div>
                      </div>
                      <button className="bg-[#4B0082] text-white text-[13px] px-4 py-1.5 rounded">
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                )}

                {/* Entire Trip */}
                {selectedOutbound && selectedInbound && (
                  <div className="flex items-center">
                    <div className="flex-1 pr-10">
                      <div className="text-[13px] text-gray-400 mb-2">Inbound Station/outbound Station</div>
                      <div className="text-[15px]">
                        {selectedOutbound.route.from} <span className="text-gray-500">( {selectedOutbound.route.from.slice(0, 3).toUpperCase()} )</span> To {selectedOutbound.route.to} <span className="text-gray-500">( {selectedOutbound.route.to.slice(0, 3).toUpperCase()} )</span> Entire Trip
                      </div>
                    </div>
                    <div className="w-[1px] h-14 bg-gray-100"></div>
                    <div className="flex items-center justify-between pl-10 w-[320px]">
                      <div>
                        <div className="text-[13px] text-gray-400 mb-1">Amount Fee</div>
                        <div className="text-[15px]">{formatPrice(totalPrice)} PKR</div>
                      </div>
                      <button className="bg-[#4B0082] text-white text-[13px] px-4 py-1.5 rounded">
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="max-w-[1280px] mx-auto px-[60px] flex justify-between items-center py-12 mt-16">
          <button 
            onClick={() => window.history.back()} 
            className="text-[13px] text-gray-600 hover:text-gray-800"
          >
            Back to Personal Details
          </button>
          <button 
            onClick={handleContinueClick}
            className="bg-[#4B0082] text-white text-[13px] px-10 py-3 rounded"
          >
            Continue To Next Step
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Confirm;
