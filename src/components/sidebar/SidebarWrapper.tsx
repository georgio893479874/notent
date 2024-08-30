import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const noSidebarRoutes = ['/', '/signin', '/register'];
  
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {children}
      {showSidebar && <Sidebar/>}
    </>
  );
};

export default SidebarWrapper;
