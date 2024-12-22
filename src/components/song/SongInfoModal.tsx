import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaPlay, FaPause } from 'react-icons/fa';
import { PiSkipForwardFill, PiSkipBackFill } from 'react-icons/pi';
import { ISongInfoModal } from '@/interfaces/SongInfoModalInterface';

const SongInfoModal: React.FC<ISongInfoModal> = ({ 
  song, 
  onClose, 
  onPlayPause, 
  isPlaying, 
  type, 
  min, 
  max, 
  value, 
  onChange, 
  progressBar, 
  skipBegin, 
  skipEnd, 
  current,
  duration
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isExiting, onClose]);

  const handleClose = () => {
    setIsExiting(true);
  };

  return (
    <motion.div 
      className="fixed inset-0 flex-col bg-[#2b2b2b] flex md:hidden w-full h-full info-modal"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? "100%" : "0%" }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-row h-full relative">
        <div className="flex-1 text-white flex flex-col justify-center items-center p-8">
          <button onClick={handleClose} className="absolute top-4 left-4 text-gray-300 p-2">
            <ExpandMoreIcon fontSize="large"/>
          </button>
          <img src={song.image_link} alt={song.article} className="rounded-lg w-64 h-64 object-cover"/>
          <div className="mt-4 text-center">
            <h2 className="text-4xl font-bold">{song.article}</h2>
            <p className="mt-5">{song.author}</p>
          </div>
          <div className="w-full flex flex-col items-center mt-4">
            <div className="w-full flex items-center justify-between px-4 mb-2">
              <span className="text-xl p-4">{current}</span>
              <input 
                type={type}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                ref={progressBar} 
                className="w-full h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
                style={{
                  backgroundSize: `${(value / max) * 100}% 100%`,
                  backgroundImage: "linear-gradient(to right, white, white)",
                }}
              />
              <span className="text-xl p-4">{duration}</span>
            </div>
            <div className="flex items-center justify-center">
              <button onClick={skipBegin}>
                <PiSkipBackFill size={30}/>
              </button>
              <button onClick={() => onPlayPause(song)} className="p-6">
                {isPlaying ? <FaPause size={42}/> : <FaPlay size={42}/> }
              </button>
              <button onClick={skipEnd}>
                <PiSkipForwardFill size={30}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SongInfoModal;



