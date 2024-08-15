import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-950 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl">Notent</h1>
      <nav className="hidden md:flex gap-4">
        <a href="#features" className="text-white">Home</a>
        <a href="#about" className="text-white">Features</a>
        <a href="#download" className="text-white">Download</a>
        <a href="#pricing" className="text-white">Pricing</a>
      </nav>
      <button className="md:hidden text-white fixed right-4 top-4 z-50" onClick={toggleMenu}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <nav
        className={`fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <a href="#features" className="text-white py-4 text-lg" onClick={toggleMenu}>Home</a>
        <a href="#about" className="text-white py-4 text-lg" onClick={toggleMenu}>Features</a>
        <a href="#download" className="text-white py-4 text-lg" onClick={toggleMenu}>Download</a>
        <a href="#pricing" className="text-white py-4 text-lg" onClick={toggleMenu}>Pricing</a>
        <div className="gap-6 flex">
            <button className="bg-pink-500 text-white px-4 py-2 rounded"><Link to="/signin">Login</Link></button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded"><Link to="/register">Sign Up</Link></button>
        </div>
      </nav>
      <div className="hidden md:flex gap-4">
        <button className="text-white"><Link to="/signin">Login</Link></button>
        <button className="bg-pink-500 text-white px-4 py-2 rounded"><Link to="/register">Sign Up</Link></button>
      </div>
    </header>
  );
};

export default Header;

