import { supabase } from "@/services/SupabaseClientService";
import { useState } from "react";
import SongForm from "./SongForm";

interface ICreateSong {
  onClose?: () => void;
  fileUrl?: string;
}

const CreateSong: React.FC<ICreateSong> = ({ onClose, fileUrl }) => {
  const [article, setArticle] = useState("");
  const [author, setAuthor] = useState("");
  const [songUrl, setSongUrl] = useState(fileUrl || "");
  const [imageUrl, setImageUrl] = useState("");

  const createSong = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await supabase.auth.getUser();
    const id = user.data.user?.id;

    const { error } = await supabase.from("Songs").insert([
      {
        article: article,
        author: author,
        audio_link: songUrl,
        image_link: imageUrl,
        user_id: id,
      },
    ]);

    if (error) {
      throw error;
    } 
    
    else {
      if (onClose) {
        onClose()
      };
    }
  };

  return (
    <SongForm
      title="Create Song"
      handle={createSong}
      article={article}
      author={author}
      songUrl={songUrl}
      imageUrl={imageUrl}
      setArticle={setArticle}
      setAuthor={setAuthor}
      setSongUrl={setSongUrl}
      setImageUrl={setImageUrl}
      onClose={onClose || (() => {})}
      buttonContent="Create"
    />
  );
};

export default CreateSong;





