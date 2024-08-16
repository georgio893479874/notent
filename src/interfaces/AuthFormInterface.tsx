interface IAuthForm {
    title: string;
    buttonContent: string,
    isSignUp: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    error: string | null;
    showPassword: boolean;
    handleClickShowPassword: () => void;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setName?: React.Dispatch<React.SetStateAction<string>> | undefined;
}

export type { IAuthForm };