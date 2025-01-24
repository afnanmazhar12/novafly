import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    window.location.href = '/booking-confirmation';
  };

  return (
    <button
      onClick={handlePurchase}
      className="bg-[#4B0082] text-white px-6 py-2.5 rounded-lg text-[14px]"
    >
      Purchase Now
    </button>
  );
};

export default Payment; 