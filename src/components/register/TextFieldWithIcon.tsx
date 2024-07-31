import { Visibility, VisibilityOff } from '@mui/icons-material';

interface ITextFieldWithIcon {
  content: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  handleClickShowPassword?: () => void;
  showPassword?: boolean;
  required?: boolean;
}

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