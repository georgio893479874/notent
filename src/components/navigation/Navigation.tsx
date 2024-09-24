import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiBellRingingFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import AvatarMenu from "./AvatarMenu";

const Navigation = () => {
  const navigate = useNavigate();

  const handleSearchNavigation = () => {
    navigate("/search");
  };

  return (
    <div className="flex items-center p-6 absolute top-0 left-0 w-full z-50">
      <div className="w-full max-w-[650px] mx-auto">
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-black bg-opacity-40 rounded-2xl transition duration-200"
          >
            <IoArrowBackOutline size={26} style={{ color: "white" }} />
          </button>
          <div className="relative w-full">
            <input
              type="text"
              className="p-4 pl-10 bg-black bg-opacity-40 text-white placeholder-gray-500 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white w-full backdrop-blur-lg"
              placeholder="Search songs, albums or artists..."
              readOnly
              onClick={handleSearchNavigation}
            />
            <FaSearch
              onClick={handleSearchNavigation}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
              size={20}
            />
          </div>
          <button className="p-3 bg-black bg-opacity-40 rounded-2xl transition duration-200 hidden md:flex">
            <PiBellRingingFill size={25} style={{ color: "white" }} />
          </button>
          <AvatarMenu />
        </div>
      </div>
    </div>
  );
};

export default Navigation;