import { supabase } from '@/services/SupabaseClientService';

interface FileUploadProps {
  setFileUrl: (url: string) => void;
  inputContent?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFileUrl, inputContent }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const fileName = `${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage.from('Songs').upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage.from('Songs').getPublicUrl(fileName);

        setFileUrl(urlData.publicUrl || "");
      } 
      
      catch (error) {
        throw error;
      }
    }
  };

  return (
    <div className="grid w-full max-w-md items-center gap-2">
      <label className="text-lg font-medium text-gray-900 dark:text-gray-200">{inputContent}</label>
      <input
        id="file"
        type="file"
        onChange={handleFileChange}
        className="
          block
          w-full
          p-4
          border
          border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-800
          text-gray-900
          dark:text-gray-100
          rounded-lg
          shadow-md
          transition-all
          duration-300
          ease-in-out
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          dark:focus:ring-blue-400
          focus:border-blue-500
          dark:focus:border-blue-400
          file:border-0
          file:bg-gray-100
          file:dark:bg-gray-700
          file:text-gray-700
          file:dark:text-gray-300
          file:rounded-lg
          file:p-2
          file:cursor-pointer
        "
      />
    </div>
  );
};

export default FileUpload;




