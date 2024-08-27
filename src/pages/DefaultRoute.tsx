import AvatarMenu from "@components/profile/AvatarMenu";
import Sidebar from "@/components/sidebar/Sidebar";
import Player from "@components/player/Player";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "@/components/NavigationButtons/NavigationButtons";

const DefaultRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    if (!userIsLoggedIn) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <>
      <NavigationButtons/>
      <div className="flex flex-col items-center justify-center p-4">
        <Player/>
      </div>
      <Sidebar/>
      <AvatarMenu/>
    </>
  );
};

export default DefaultRoute;
