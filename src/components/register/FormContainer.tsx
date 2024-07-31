import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface IFormContainer {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const FormContainer: React.FC<IFormContainer> = ({ title, subtitle, children }) => {
  return (
    <>
      <Typography variant="h4" className="text-2xl font-bold mb-2">{title}</Typography>
      <Typography variant="body2" className="text-sm text-gray-600 mb-4">{subtitle}</Typography>
      <div className="p-4 bg-gray-50 rounded-lg">
        {children}
      </div>
    </>
  );
};

export default FormContainer;
