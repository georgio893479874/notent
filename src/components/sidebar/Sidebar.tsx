import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateSong from "../songManager/CreateSong";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-1/5 p-3 dark:bg-gray-800 bg-white border-r shadow-lg">
        <nav>
          <div className="flex flex-col dark:bg-gray-900 bg-gray-100 rounded-lg mb-2">
            <Link
              to="/"
              className="flex items-center px-6 py-2 text-gray-400 border-l-4 border-transparent"
            >
              <MdHomeFilled />
              <span className="ml-3">Home</span>
            </Link>
            <Link
              to="/search"
              className="flex items-center px-6 py-2 text-gray-400 border-l-4 border-transparent"
            >
              <MdSearch />
              <span className="ml-3">Search</span>
            </Link>
          </div>
          <div className="flex flex-col dark:bg-gray-900 bg-gray-100 rounded-lg">
            <button
              onClick={openModal}
              className="flex items-center px-6 py-2 text-gray-400 border-l-4 border-transparent"
            >
              <IoLibrary />
              <span className="ml-3">Create Song</span>
            </button>
          </div>
        </nav>
      </div>
      <div className="fixed bottom-0 left-0 w-full dark:bg-gray-800 bg-white md:hidden z-40">
        <nav className="flex justify-around p-2">
          <Link
            to="/"
            className="flex flex-col items-center text-gray-400"
          >
            <MdHomeFilled size={24}/>
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/search"
            className="flex flex-col items-center text-gray-400"
          >
            <MdSearch size={24}/>
            <span className="text-xs">Search</span>
          </Link>
          <button
            onClick={openModal}
            className="flex flex-col items-center text-gray-400"
          >
            <IoLibrary size={24}/>
            <span className="text-xs">Create</span>
          </button>
        </nav>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CreateSong onClose={closeModal} />
        </div>
      )}
    </>
  );
};

export default Sidebar;


