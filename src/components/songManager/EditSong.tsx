import { supabase } from "@/services/SupabaseClientService";
import { useState, useEffect } from "react";
import SongForm from "./SongForm";

const EditSong = ({
  onClose,
  article,
}: {
  onClose: () => void;
  article: string;
}) => {
  const [currentArticle, setCurrentArticle] = useState(article);
  const [author, setAuthor] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSongId = async () => {
      const { data, error } = await supabase.from("Songs").select("id").eq("article", currentArticle).single();

      if (error) {
        throw error;
        return;
      }

      setId(data?.id || null);
    };

    fetchSongId();
  }, [currentArticle]);

  const editSong = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id === null) {
      return;
    }

    const { error: updateError } = await supabase.from("Songs").update({
      article: currentArticle,
      author: author,
      audio_link: songUrl,
      image_link: imageUrl,
    }).eq("id", id);

    if (updateError) {
      throw updateError;
    } 
    
    else {
      onClose();
    }
  };

  return (
    <SongForm
      title="Edit Song"
      handle={editSong}
      article={currentArticle}
      author={author}
      songUrl={songUrl}
      imageUrl={imageUrl}
      setArticle={setCurrentArticle}
      setAuthor={setAuthor}
      setSongUrl={setSongUrl}
      setImageUrl={setImageUrl}
      onClose={onClose}
      buttonContent="Edit"
    />
  );
};

export default EditSong;
