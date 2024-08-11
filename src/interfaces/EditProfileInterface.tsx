interface IEditProfileForm {
    handleChangeName: (e: React.FormEvent) => Promise<void>;
    handleChangeEmail: (e: React.FormEvent) => Promise<void>;
    name: string;
    email: string;
    setName: (value: React.SetStateAction<string>) => void;
    setEmail: (value: React.SetStateAction<string>) => void;
    avatar: string;
    handleAvatarChange: () => void;
}

export type { IEditProfileForm };