import AvatarMenu from "@components/profile/AvatarMenu";
import Sidebar from "@/components/sidebar/Sidebar";
import Player from "@components/player/Player";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <Player/>
      <Sidebar/>
      <AvatarMenu/>
    </>
  );
};

export default DefaultRoute;
