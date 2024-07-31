import AvatarMenu from "@components/primitives/AvatarMenu";
import Sidebar from "@components/primitives/Sidebar";
import Player from "@components/player/Player";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DefaultRoutes = () => {
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

export default DefaultRoutes;
