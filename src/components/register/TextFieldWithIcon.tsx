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
    <div>
      <input
        className="text-field-input"
        type={type}
        onChange={onChange}
        placeholder={content}
      />
      {content === 'Password' && (
        <button onClick={handleClickShowPassword} type="button" className="text-field-icon-button">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
      )}
    </div>
  );
};

export default TextFieldWithIcon;