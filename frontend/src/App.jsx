import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Booking from './pages/booking';
import Flights from './pages/flights';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Landing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/flights" element={<Flights />} />

        <Route path="*" element={<Landing />} />
        {/* Uncomment these as you add more pages */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
