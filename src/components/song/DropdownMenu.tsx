import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPen, FaTrash } from "react-icons/fa";
import EditSong from "../songManager/EditSong";
import { supabase } from "@/services/SupabaseClientService";

const DropdownMenu = ({ article }: { article: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchSongId = async () => {
      try {
        const { data, error } = await supabase.from("Songs").select("id").eq("article", article).single();

        if (error) {
          throw error;
        }

        setId(data?.id || null);
      } 
      
      catch (error) {
        throw error;
      }
    };

    fetchSongId();
  }, [article]);

  const deleteSong = async () => {
    if (id === null) {
      return;
    }

    try {
      const { error } = await supabase.from("Songs").delete().eq("id", id);

      if (error) {
        throw error;
      }

      closeMenu();
    } 
    
    catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="relative">
        <BsThreeDots onClick={toggleMenu} />
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 text-center">
            <button
              className="flex justify-center gap-4 mx-auto text-black dark:text-white"
              onClick={openModal}
            >
              Edit
              <FaPen className="w-5 h-5" />
            </button>
            <button
              className="flex justify-center gap-4 mx-auto text-black dark:text-white"
              onClick={deleteSong}
            >
              Remove
              <FaTrash className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <EditSong onClose={closeModal} article={article} />
        </div>
      )}
    </>
  );
};

export default DropdownMenu;

