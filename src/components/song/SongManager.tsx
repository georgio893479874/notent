import { useState } from "react";
import CreateSong from "../songManager/CreateSong";
import FileUpload from "../songManager/FileUpload";

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


