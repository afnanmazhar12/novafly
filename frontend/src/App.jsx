import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Booking from './pages/booking';
import Flights from './pages/flights';
import Confirm from './pages/confirm';
import Information from './pages/information';
import Payments from './pages/payments';
import BookingConfirmation from './pages/BookingConfirmation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/confirmation" element={<Confirm />} />
        
        <Route path="/payment" element={<Payments />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        {/* Uncomment these as you add more pages */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
