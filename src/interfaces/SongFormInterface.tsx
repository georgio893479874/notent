interface ISongForm {
    title: string;
    handle: (e: React.FormEvent) => Promise<void>;
    article: string;
    author: string;
    songUrl: string;
    imageUrl: string;
    setArticle: (value: React.SetStateAction<string>) => void;
    setAuthor: (value: React.SetStateAction<string>) => void;
    setSongUrl: (value: React.SetStateAction<string>) => void;
    setImageUrl: (value: React.SetStateAction<string>) => void;
    onClose: () => void;
    buttonContent: string;
}

export type { ISongForm };