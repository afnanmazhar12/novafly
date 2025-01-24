import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const FlightDetailCard = ({ flight, isReturn }) => {
  // Format time helper function
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div className="bg-[#f6f6f6] rounded-xl p-6">
      <div className="bg-white rounded-xl p-6">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-gray-400 text-[13px] mb-1">
              {isReturn ? 'Return Flight' : 'Departure Flight'}
            </div>
            <div className="text-[14px]">
              {flight.flight.date}
            </div>
          </div>
          <div className="border-l border-gray-200 pl-8">
            <div className="text-[14px]">Type Of Class / Fare</div>
            <div className="text-gray-400 text-[14px]">Economy / Saver</div>
          </div>
        </div>

        {/* Flight Timeline */}
        <div className="flex items-start mb-8">
          <div className="w-[600px]">
            <div className="flex items-center">
              <div>
                <div className="text-gray-400 text-[13px] mb-1">
                  {flight.route.from.slice(0, 3).toUpperCase()}
                </div>
                <div className="text-[32px] font-bold">
                  {formatTime(flight.flight.departureTime)}
                </div>
              </div>
              
              <div className="flex-1 mx-8 relative">
                <div className="border-t border-dashed border-gray-300"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              <div>
                <div className="text-gray-400 text-[13px] mb-1">
                  {flight.route.to.slice(0, 3).toUpperCase()}
                </div>
                <div className="text-[32px] font-bold">
                  {formatTime(flight.flight.arrivalTime)}
                </div>
              </div>
            </div>
            <div className="text-center text-gray-400 text-[13px] mt-2">
              {/* Calculate duration if needed or use flight.duration if available */}
              {isReturn ? '24 hrs 45 mins' : '13 hrs 45 mins'}
            </div>
          </div>

          <div className="border-l border-gray-200 h-24 mx-8"></div>

          <div>
            <div className="text-[14px]">Type Of Class / Fare</div>
            <div className="text-gray-400 text-[14px]">Economy / Saver</div>
          </div>
        </div>

        {/* Fare Rules Details */}
        <div>
          <div className="text-[14px] font-medium mb-4">Fare Rules Details</div>
          <div className="flex gap-4">
            <div className="bg-[#F8F8F8] rounded-lg py-2.5 px-4 flex items-center gap-2">
              <span className="text-[13px] text-gray-600">+ Checked Baggage: 25kg</span>
            </div>
            <div className="bg-[#F8F8F8] rounded-lg py-2.5 px-4 flex items-center gap-2">
              <span className="text-[13px] text-gray-600">+ Change Fee: 22,288 PKR</span>
            </div>
            <div className="bg-[#F8F8F8] rounded-lg py-2.5 px-4 flex items-center gap-2">
              <span className="text-[13px] text-gray-600">+ Refund Fee: 60,200 PKR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PassengerDetailsCard = () => {
  return (
    <div className="mt-12 bg-white rounded-[15px] p-6 mb-6 shadow-[0_4px_20.8px_rgba(0,0,0,0.08)]">
      <h2 className="text-[14px] font-medium mb-6">Flight Passengers Details</h2>
      
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-[32px] font-bold mb-2">01</div>
          <div className="text-[13px] text-gray-500">Adult Passenger</div>
        </div>

        <div className="text-center">
          <div className="text-[32px] font-bold mb-2">01</div>
          <div className="text-[13px] text-gray-500">Teenage Passenger</div>
        </div>

        <div className="text-center">
          <div className="text-[32px] font-bold mb-2">01</div>
          <div className="text-[13px] text-gray-500">Kid Passenger</div>
        </div>

        <div className="text-center">
          <div className="text-[32px] font-bold mb-2">01</div>
          <div className="text-[13px] text-gray-500">Infant Passenger</div>
        </div>

        <div className="text-center">
          <div className="text-[32px] font-bold text-[#4B0082] mb-2">04</div>
          <div className="text-[13px] text-gray-500">Total Passengers</div>
        </div>

        <div className="text-center">
          <div className="text-[32px] font-bold text-[#4B0082] mb-2">237,030</div>
          <div className="text-[13px] text-gray-500">Total Amount</div>
        </div>
      </div>
    </div>
  );
};

const Payments = () => {
  const navigate = useNavigate();
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedInbound, setSelectedInbound] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const outboundData = localStorage.getItem('selectedOutboundFlight');
    const inboundData = localStorage.getItem('selectedInboundFlight');

    if (outboundData) {
      const outbound = JSON.parse(outboundData);
      setSelectedOutbound(outbound);
      setTotalPrice(prevTotal => prevTotal + outbound.price);
    }

    if (inboundData) {
      const inbound = JSON.parse(inboundData);
      setSelectedInbound(inbound);
      setTotalPrice(prevTotal => prevTotal + inbound.price);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateDuration = (depTime, arrTime) => {
    const [depHours, depMinutes] = depTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrTime.split(':').map(Number);
    
    let hoursDiff = arrHours - depHours;
    let minutesDiff = arrMinutes - depMinutes;
    
    if (hoursDiff < 0) hoursDiff += 24;
    if (minutesDiff < 0) {
      hoursDiff--;
      minutesDiff += 60;
    }
    
    return `${hoursDiff} hrs ${minutesDiff} mins`;
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    // Process payment logic here
    console.log('Processing payment...', { cardDetails, totalPrice });
    navigate('/booking-confirmation');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1280px] mx-auto px-[60px] pt-6">
        {/* Header */}
        <h1 className="text-[24px] font-semibold mb-2">
          Review Your <span className="text-[#4B0082]">Selected Tickets</span>
        </h1>
        <p className="text-[14px] text-gray-500 mb-8">
          Here, you can verify all essential information, including flight itinerary, passenger details, and payment summary.
        </p>

        {/* Flight Details */}
        {selectedOutbound && (
          <FlightDetailCard flight={selectedOutbound} isReturn={false} />
        )}
        {selectedInbound && (
          <FlightDetailCard flight={selectedInbound} isReturn={true} />
        )}

        {/* Add Passenger Details Card here */}
        <PassengerDetailsCard />

        {/* Footer Links */}
        <div className="flex gap-6 mt-8 text-[13px] text-gray-600">
          <button className="flex items-center gap-2">
            Fare Breakdown
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="flex items-center gap-2">
            Fare Rules / Terms & Condition
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="flex items-center gap-2">
            Miles Summary
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>

        {/* Payment Methods Section */}
        <div className="mt-12">
          <h2 className="text-center w-[400px] mx-auto">
            <span className="text-[#4B0082] font-montserrat font-[700] text-[30px] leading-[36.57px]">Payment</span>
            <span className="font-montserrat font-[700] text-[30px] leading-[36.57px]"> Methods To Pay</span>
          </h2>
          
          <p className="text-center text-[14px] text-gray-500 mt-2 mb-8">
            Each transaction is protected to ensure your details remain safe,<br />
            making it easy to finalize your purchase with confidence.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="w-[517px] h-[209px] border border-[#4B0082] rounded-[15px] p-8 text-center shadow-[0_4px_20.8px_rgba(0,0,0,0.08)]">
              <h3 className="text-[17px] font-[700] leading-[22px] mb-4 font-montserrat">Pay With Full Price</h3>
              <p className="text-[14px] text-gray-500">
                Select this option to pay the full price<br />
                in one click according to your<br />
                payment methods
              </p>
            </div>

            <div className="w-[518px] h-[209px] border border-[1px] rounded-[15px] p-8 text-center shadow-[0_4px_20.8px_rgba(0,0,0,0.08)]">
              <h3 className="text-[17px] font-[700] leading-[22px] mb-4 font-montserrat">Pay With Cash+Nova</h3>
              <p className="text-[14px] text-gray-500">
                Select this option to pay the half<br />
                price in one click according to your<br />
                payment methods
              </p>
            </div>
          </div>
        </div>

        {/* Payment Form Section */}
        <div className="mt-12">
          <img src="/payment.png" alt="Payment Form" className="w-full" />
        </div>

        {/* Terms and Total */}
        <div className="mt-8 bg-[#FFFFFF] rounded-[15px] p-6 shadow-[0_4px_20.8px_rgba(0,0,0,0.08)]">
          <h3 className="text-[14px] font-medium mb-4">Terms & Condition</h3>
          <div className="flex items-start gap-3 mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-[13px] text-gray-500 leading-relaxed">
              By booking with us, you agree to our terms regarding fare, payment, and privacy policies. Fares are subject to change based on availability and booking time, and payment must be made in full at the time of booking to secure your ticket. All transactions are processed securely, and personal data is handled in accordance with our privacy policy to ensure confidentiality. Online bookings are subject to availability, and we reserve the right to modify or cancel bookings if necessary. Please review all details carefully before completing your purchase to ensure a smooth and secure experience.
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-[14px] font-medium mb-1">Total Amount</div>
              <div className="text-[#4B0082] text-[32px] font-bold">{totalPrice.toLocaleString()} PKR</div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#4B0082] text-white px-6 py-2.5 rounded-lg text-[14px]"
            >
              Purchase Now
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center py-12 mt-16">
          <button 
            onClick={() => window.history.back()} 
            className="text-[13px] text-gray-600 hover:text-gray-800"
          >
            Back to Personal Details
          </button>
          <button className="bg-[#4B0082] text-white text-[13px] px-10 py-3 rounded">
            Continue To Payment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payments; 