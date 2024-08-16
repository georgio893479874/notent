import React from 'react';
import { ITextFieldWithIcon } from '@/interfaces/TextFieldWidthIcon';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TextFieldWithIcon: React.FC<ITextFieldWithIcon> = ({ 
  content, 
  onChange, 
  type, 
  handleClickShowPassword, 
  showPassword 
}) => {
  return (
    <div className="relative mb-4">
      <label htmlFor="input" className="block text-sm font-medium text-gray-300 mb-2">{content}</label>
      <input
        type={type}
        id="input"
        onChange={onChange}
        placeholder={content}
        className={`w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-indigo-500 ${content === 'Password' ? 'pr-12' : ''}`}
      />
      {content === 'Password' && (
        <button 
          onClick={handleClickShowPassword} 
          type="button" 
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 mt-8"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
      )}
    </div>
  );
};

export default TextFieldWithIcon;
