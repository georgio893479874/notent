import { useState } from "react";
import CreateSong from "./CreateSong";
import FileUpload from "./FileUpload";

const SongManager = () => {
  const [fileUrl, setFileUrl] = useState("");

  return (
    <div>
      <FileUpload setFileUrl={setFileUrl}/>
      <CreateSong fileUrl={fileUrl}/>
    </div>
  );
};

export default SongManager;


