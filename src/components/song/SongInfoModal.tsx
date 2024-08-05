import { ISong } from "@/services/ControlsService";

interface ISongInfoModal {
  song: ISong;
  onClose: () => void;
}

const SongInfoModal = ({ song, onClose }: ISongInfoModal) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-2">{song.article}</h2>
        <p className="text-gray-600 mb-4">Author: {song.author}</p>
        <img src={song.image_link} alt={song.article} className="w-full h-auto mb-4 rounded-lg" />
        <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded">Close</button>
      </div>
    </div>
  );
};

export default SongInfoModal;

