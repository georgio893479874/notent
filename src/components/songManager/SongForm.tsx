import { ISongForm } from "@/interfaces/SongFormInterface";
import FileUpload from "./FileUpload";

const SongForm: React.FC<ISongForm> = ({ 
    title,
    handle, 
    article, 
    author,
    setArticle, 
    setAuthor, 
    setSongUrl, 
    setImageUrl,
    onClose,
    buttonContent
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <form onSubmit={handle} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
        <input
          placeholder="Song title"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm mb-4 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          placeholder="Artist"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm mb-4 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FileUpload setFileUrl={setSongUrl} inputContent="Add Audio"/>
        <FileUpload setFileUrl={setImageUrl} inputContent="Add Image"/>
        <button
          type="submit"
          className="mt-2 p-3 bg-blue-600 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
        >
          {buttonContent}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 p-2 bg-red-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full"
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default SongForm;
