import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = location.key !== 'default';

  const goBack = () => {
    if (canGoBack) {
      navigate(-1);
    }
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div className="flex fixed lg:left-72 left-4 gap-4 my-4">
      <button
        onClick={goBack}
        disabled={!canGoBack}
        className={`p-2 rounded-full bg-[#313b41a7] ${canGoBack ? 'text-gray-800 hover:text-gray-600' : 'text-gray-400 cursor-not-allowed'}`}
      >
        <FaArrowLeft className="text-2xl"/>
      </button>
      <button
        onClick={goForward}
        className="p-2 rounded-full bg-[#313b41a7] text-gray-800 hover:text-gray-600 hidden lg:flex"
      >
        <FaArrowRight className="text-2xl"/>
      </button>
    </div>
  );
};

export default NavigationButtons;

