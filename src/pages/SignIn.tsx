import AuthForm from "@components/register/AuthForm";
import { handleSignIn } from "@/services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
  
    try {
      const result = await handleSignIn({ email, password });
  
      if (result.error) {
        throw new Error(result.error);
      }
  
      localStorage.setItem("userLoggedIn", "true");
      
      navigate("/player");
    } 
    
    catch (error: any) {
      setError(error.message || error);
    } 
  };  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthForm
      title="Sign Into Your Account"
      buttonContent="Login"
      isSignUp={false}
      onSubmit={signIn}
      error={error}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default SignIn;

