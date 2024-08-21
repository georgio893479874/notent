import { useState } from "react";
import AuthForm from "@components/register/AuthForm";
import { handleSignIn, handleSignUp } from "@/services/AuthService";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const { error: signUpError } = await handleSignUp({
        name,
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }
    } 
    
    catch (error: any) {
      setError(error.message || error);
    } 
    
    finally {
      await handleSignIn({ email, password });

      navigate("/player");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthForm
      title="Register New Account"
      buttonContent="Register"
      isSignUp={true}
      onSubmit={signUp}
      error={error}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      setEmail={setEmail}
      setPassword={setPassword}
      setName={setName}
    />
  );
};

export default Register;
