import Navigation from "@/components/navigation/Navigation";
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
      <Navigation/>
    </>
  );
};

export default DefaultRoute;
