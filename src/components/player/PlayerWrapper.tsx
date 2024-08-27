import { useLocation } from 'react-router-dom';
import Player from './Player';

const PlayerWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const noPlayerRoutes = ['/', '/signin', '/register', '/settings', '/profile', '/editprofile'];
  
  const showPlayer = !noPlayerRoutes.includes(location.pathname);

  return (
    <>
      {children}
      {showPlayer && <Player />}
    </>
  );
};

export default PlayerWrapper;
