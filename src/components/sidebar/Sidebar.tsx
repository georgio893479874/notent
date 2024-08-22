import { useState } from 'react';
import { FaHome, FaCompactDisc, FaFolderOpen } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import { BsMusicNoteList } from "react-icons/bs";
import { PiMicrophoneThin, PiMusicNotesPlusThin } from "react-icons/pi";
import { ImHeart } from "react-icons/im";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { name: 'Home', icon: <FaHome size={24}/>, path: "/player" },
    { name: 'Discover', icon: <FaCompactDisc size={24}/>, path: "/search" },
    { name: 'Radio', icon: <FaRadio size={24}/>, path: "/radio" },
    { name: 'Albums', icon: <BsMusicNoteList size={24}/>, path: "/albums" },
    { name: 'Podcast', icon: <PiMicrophoneThin size={24}/>, path: "/podcast" },
  ];

  const libraryItems = [
    { name: 'Recently Added', icon: <PiMusicNotesPlusThin size={24}/>, path: "/recent" },
    { name: 'Favorite Songs', icon: <ImHeart size={24}/>, path: "/favorites" },
    { name: 'Local Files', icon: <FaFolderOpen size={24}/>, path: "/local" },
  ];

  return (
    <>
      <div className="hidden lg:flex flex-col w-64 h-screen bg-[#272727] text-gray-200 fixed top-0 left-0">
        <div className="flex items-center justify-center h-20 bg-[#2b2b2b] gap-3">
          <span className="text-4xl font-bold text-gray-400">Notent</span>
        </div>
        <nav className="mt-10">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path}>
                  <div
                    className={`flex items-center py-2 px-6 rounded-lg cursor-pointer mb-2 ${
                      activeItem === item.name ? 'bg-gray-800 text-white' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    <span className="mr-4">{item.icon}</span>
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-gray-400 uppercase">Library</h2>
          <ul className="mt-4">
            {libraryItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path}>
                  <div
                    className={`flex items-center py-2 px-6 rounded-lg cursor-pointer mb-2 ${
                      activeItem === item.name ? 'bg-gray-800 text-white' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    <span className="mr-4">{item.icon}</span>
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#212121] text-gray-200 flex justify-around py-2 shadow-inner">
        {menuItems.slice(0, 4).map((item) => (
          <Link to={item.path} key={item.name}>
            <div
              className={`flex flex-col items-center justify-center ${
                activeItem === item.name ? 'text-white' : 'text-gray-400'
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;


