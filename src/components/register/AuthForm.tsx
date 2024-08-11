import { CircularProgress, Typography } from '@mui/material';
import TextFieldWithIcon from './TextFieldWithIcon';
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';
import { IAuthForm } from '@/interfaces/AuthFormInterface';

const AuthForm: React.FC<IAuthForm> = ({ 
  title, 
  subtitle, 
  isSignUp, 
  onSubmit, 
  loading, 
  error, 
  showPassword, 
  handleClickShowPassword, 
  setEmail, 
  setPassword, 
  setName,
}) => {
  return (
    <form onSubmit={onSubmit} className="form-container">
      <FormContainer title={title} subtitle={subtitle}>
        {isSignUp && setName &&  (
          <div className="text-field-container">
            <TextFieldWithIcon 
              content="Full Name" 
              type="text" 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="text-field-container">
          <TextFieldWithIcon 
            content="Enter Email" 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="text-field-container">
          <TextFieldWithIcon 
            content="Password" 
            type={showPassword ? 'text' : 'password'} 
            onChange={(e) => setPassword(e.target.value)} 
            handleClickShowPassword={handleClickShowPassword} 
            showPassword={showPassword} 
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          {loading ? <CircularProgress/> : isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <Typography variant="body2" className="text-center text-gray-600 pt-2">
          {isSignUp ? "Do You Have An Account?" : "Don't Have An Account?"} <Link to={isSignUp ? "/signin" : "/register"} className="link">{isSignUp ? "Sign In" : "Register"}</Link>
        </Typography>
      </FormContainer>
    </form>
  );
};

export default AuthForm;
