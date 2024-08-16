import TextFieldWithIcon from './TextFieldWithIcon';
import { Link } from 'react-router-dom';
import { IAuthForm } from '@/interfaces/AuthFormInterface';
import CustomCheckBox from './CustomCheckBox';

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
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-950">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-gray-950 md:rounded-lg shadow-lg overflow-hidden">
        <div
          className="w-full lg:w-1/2 h-64 lg:h-auto bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1521747116042-5a810fda9664")' }}
        >
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 bg-gray-900 text-white">
          <div className="w-full max-w-md">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-100 mb-4 lg:mb-6">Notent</h2>
            <p className="text-gray-300 mb-4 lg:mb-6">{title}</p>
            <form onSubmit={onSubmit}>
              {isSignUp && setName &&  (
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
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 lg:mb-6">
                <div className="flex items-center">
                  <CustomCheckBox />
                </div>
                <Link to="#" className="text-sm text-indigo-400 mt-2 lg:mt-0 lg:ml-4 self-start lg:self-center">Forgot Password?</Link>
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


