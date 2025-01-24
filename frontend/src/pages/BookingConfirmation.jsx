import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Re-using FlightDetailCard component from payments.jsx
const FlightDetailCard = ({ flight, isReturn }) => {
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

const BookingConfirmation = () => {
  const [selectedOutbound, setSelectedOutbound] = React.useState(null);
  const [selectedInbound, setSelectedInbound] = React.useState(null);

  React.useEffect(() => {
    const outboundData = localStorage.getItem('selectedOutboundFlight');
    const inboundData = localStorage.getItem('selectedInboundFlight');

    if (outboundData) {
      setSelectedOutbound(JSON.parse(outboundData));
    }
    if (inboundData) {
      setSelectedInbound(JSON.parse(inboundData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-[1280px] mx-auto px-[60px] pt-6">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-[24px] font-semibold mb-2">Your Flight Has Been Booked</h1>
          <p className="text-[14px] text-gray-500">
            Your flight confirmation has been successfully processed.<br />
            Your flight confirmation details will be sent to your email.
          </p>
        </div>

        {/* Flight Details */}
        {selectedOutbound && (
          <FlightDetailCard flight={selectedOutbound} isReturn={false} />
        )}
        {selectedInbound && (
          <FlightDetailCard flight={selectedInbound} isReturn={true} />
        )}

        {/* Back to Home Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-[#4B0082] text-white text-[14px] px-10 py-3 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmation; 