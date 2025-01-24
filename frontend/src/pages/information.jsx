import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const PassengerDetails = () => {
  // Add state for form data
  const [formData, setFormData] = React.useState({
    firstName: '',
    secondName: '',
    contactPerson: '',
    countryRegion: '',
    email: '',
    mobileNumber: ''
  });

  // Load data from localStorage on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('passengerDetails');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      console.log('Loaded data from localStorage:', parsedData);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    localStorage.setItem('passengerDetails', JSON.stringify(newFormData));
    console.log('Updated form data:', newFormData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header with Progress Bar */}
      <div className="flex items-center justify-between px-12 pt-8">
        <div>
          <h1 className="text-xl font-bold">Conformation Of <span className="text-[#4B0082]">Personal Details</span></h1>
          <p className="text-sm text-gray-500 mt-2 max-w-[450px]">
            Providing the correct Personal and contact details data allows us to offer better support and a personalized travel experience tailored to your needs.
          </p>
        </div>
        <button className="bg-[#4B0082] text-white px-4 py-2 rounded-md text-sm">
          View Trip Summary
        </button>
      </div>

      {/* Main Content */}
      <div className="px-12 py-8 flex gap-8">
        {/* Left Section - Forms */}
        <div className="flex-1">
          {/* Important Information Box */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-sm font-semibold mb-4">Important Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• If you're travelling from Pakistan/UAE to UK to meet approval from NADRA is mandatory for absence of Pakistan travelling from Islamabad, Karachi, Multan, Quetta or Sialkot.</li>
              <li>• If you're travelling to United Kingdom, Travel requirements to the UK are changing...</li>
              <li>• Travel to Pakistan additional documents required to travel with animals, birds, products of animal origin, veterinary biologics or vaccines.</li>
              <li>• If you're travelling to Pakistan with animals, birds, products of animal origin, veterinary biologics etc vaccines, you must complete this form before.</li>
              <li className="text-[#4B0082] font-semibold cursor-pointer mt-2">Read More ›</li>
            </ul>
          </div>

          {/* Passenger Details Form */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4">Passenger Details | Adult 1</h3>
            <p className="text-xs text-gray-500 mb-4">
              Make sure the names you enter exactly match your passport, and please use English characters only. Names can't be changed once you have completed your booking.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name" 
                className="p-3 rounded-lg bg-gray-50 text-sm"
              />
              <input 
                type="text" 
                name="secondName"
                value={formData.secondName}
                onChange={handleInputChange}
                placeholder="Second Name" 
                className="p-3 rounded-lg bg-gray-50 text-sm"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact Details</h3>
            <p className="text-xs text-gray-500 mb-4">
              Add your contact details and contact details such as an email address or phone number, so we can update you directly with your updates and details.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="Contact Person" 
                className="p-3 rounded-lg bg-gray-50 text-sm"
              />
              <input 
                type="text" 
                name="countryRegion"
                value={formData.countryRegion}
                onChange={handleInputChange}
                placeholder="Country/Region" 
                className="p-3 rounded-lg bg-gray-50 text-sm"
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address" 
                className="p-3 rounded-lg bg-gray-50 text-sm"
              />
              <input 
                type="tel" 
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile Number" 
                className="p-3 rounded-lg bg-gray-50 text-sm"
              />
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Subscribed to NovaFly Special Offers
            </p>
          </div>
        </div>

        {/* Right Section - Benefits & Warnings */}
        <div className="w-[300px]">
          <div className="bg-[#4B0082] text-white p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-4">Frequent NovaFly Benefits</h3>
            <ul className="space-y-3 text-sm">
              <li>• Extra Exclusive Discounts On Flights</li>
              <li>• 24/7 Customer Support</li>
              <li>• Free Upgrades and Add-Ons</li>
              <li>• Faster Check-in on Boarding</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span>⚠️</span> Warning Details For User
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>• Wrong contact details can lead to missed flight notifications</li>
              <li>• Incorrect passenger info may prevent flight boarding</li>
              <li>• Corrections after booking may incur fees</li>
              <li>• Names must match ID's type of travel status</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-12 py-6 flex justify-between items-center border-t">
        <button className="text-gray-600 text-sm">
          ← Back to Searching Flights
        </button>
        <button className="bg-[#4B0082] text-white px-6 py-2 rounded-md text-sm">
          Continue To Next Step
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PassengerDetails;