import React, { useState } from 'react';

const flights = () => {
  const [selectedOutboundCard, setSelectedOutboundCard] = useState(null);
  const [selectedInboundCard, setSelectedInboundCard] = useState(null);

  const handleOutboundCardSelect = (flightIndex, priceType) => {
    setSelectedOutboundCard({
      flightIndex,
      priceType
    });
  };

  const handleInboundCardSelect = (flightIndex, priceType) => {
    setSelectedInboundCard({
      flightIndex,
      priceType
    });
  };

  return (
    <div>
      {/* ... existing content ... */}
      <div 
        className={`price-card w-[153px] h-[145px] ${
          selectedOutboundCard?.flightIndex === fIndex && 
          selectedOutboundCard?.priceType === 'economy' 
            ? 'selected' 
            : selectedOutboundCard ? 'dimmed' : ''
        }`}
        onClick={() => handleOutboundCardSelect(fIndex, 'economy')}
      >
        {/* ... existing content ... */}
      </div>

      <div 
        className={`price-card w-[153px] h-[145px] ${
          selectedInboundCard?.flightIndex === rIndex && 
          selectedInboundCard?.priceType === 'economy' 
            ? 'selected' 
            : selectedInboundCard ? 'dimmed' : ''
        }`}
        onClick={() => handleInboundCardSelect(rIndex, 'economy')}
      >
        {/* ... existing content ... */}
      </div>
    </div>
  );
};

export default flights; 