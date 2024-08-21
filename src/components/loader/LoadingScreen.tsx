import CircularProgress from '@mui/material/CircularProgress';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center">
        <CircularProgress color="primary" className="mb-4" />
        <h2 className="text-xl font-semibold">Loading...</h2>
        <p className="text-sm mt-2">Please wait while we load your content.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

