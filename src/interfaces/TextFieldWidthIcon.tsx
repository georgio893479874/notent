interface ITextFieldWithIcon {
    content: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    handleClickShowPassword?: () => void;
    showPassword?: boolean;
    required?: boolean;
}

export type { ITextFieldWithIcon };