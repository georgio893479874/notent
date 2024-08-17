import TextFieldWithIcon from './TextFieldWithIcon';
import { Link } from 'react-router-dom';
import { IAuthForm } from '@/interfaces/AuthFormInterface';
import CustomCheckBox from './CustomCheckBox';
import LoginIcon from "@assets/login-icon.png"

const AuthForm: React.FC<IAuthForm> = ({ 
  title, 
  buttonContent,
  isSignUp, 
  onSubmit, 
  error, 
  showPassword, 
  handleClickShowPassword, 
  setEmail, 
  setPassword, 
  setName,
}) => {
  return (
    <div className="flex items-center flex-col lg:flex-row justify-center min-h-screen lg:min-h-auto lg:bg-gray-950 bg-gray-900">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl lg:rounded-lg lg:shadow-lg overflow-hidden lg:h-1/2">
        <div
          className="background-image hidden lg:block w-full lg:w-11/12 lg:h-auto bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1521747116042-5a810fda9664")' }}
        >
        </div>
        <div className="border-none flex items-center justify-center lg:hidden w-full lg:w-1/2 bg-gray-900 text-white">
          <img src={LoginIcon} alt="Icon" className="w-96 h-96"/>
        </div>
        <div className="lg:w-full flex items-center justify-center px-6 bg-gray-900 text-white lg:px-8 pb-8">
          <div className="w-full max-w-md">
            <h2 className="text-4xl lg:text-3xl font-bold text-gray-100 mb-4 lg:mb-6 lg:mt-6">Notent</h2>
            <p className="text-gray-300 mb-4 lg:mb-6">{title}</p>
            <form onSubmit={onSubmit}>
              {isSignUp && setName && (
                <TextFieldWithIcon 
                  content="Full Name" 
                  type="text" 
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextFieldWithIcon 
                content="Email Address" 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
              <TextFieldWithIcon 
                content="Password" 
                type={showPassword ? 'text' : 'password'} 
                onChange={(e) => setPassword(e.target.value)} 
                handleClickShowPassword={handleClickShowPassword} 
                showPassword={showPassword} 
                required
              />
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 lg:mb-6 relative">
                <div className="flex items-center">
                  <CustomCheckBox />
                </div>
                <Link to="#" className="text-sm text-indigo-400 forgot-password-link">Forgot Password?</Link>
              </div>
              {error && <p className="m-4 text-center text-gray-300">{error}</p>}
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
              >
                {buttonContent}
              </button>
            </form>
            <p className="mt-4 lg:mt-6 text-center text-gray-300">
              {isSignUp ? "Do You Have An Account?" : "Don't Have An Account?"} <Link to={isSignUp ? "/signin" : "/register"} className="link">{isSignUp ? "Sign In" : "Register Here"}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;




