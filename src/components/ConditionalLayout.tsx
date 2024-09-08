import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Player from './player/Player';
import Navigation from './navigation/Navigation';

const ConditionalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const noSidebarRoutes = ['/', '/signin', '/register'];
  const noPlayerRoutes = ['/', '/signin', '/register', '/settings', '/profile', '/editprofile'];
  const noNavigationRoutes = ['/', '/signin', '/register', '/settings', '/profile', '/editprofile'];

  const showSidebar = !noSidebarRoutes.includes(location.pathname);
  const showPlayer = !noPlayerRoutes.includes(location.pathname);
  const showNavigation = !noNavigationRoutes.includes(location.pathname);

  return (
    <>
      {children}
      {showSidebar && <Sidebar/>}
      {showPlayer && <Player/>}
      {showNavigation && <Navigation/>}
    </>
  );
};

export default ConditionalLayout;
