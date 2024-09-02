interface ISong {
    id: number;
    created_at: string;
    audio_link: string;
    author: string;
    article: string;
    image_link: string;
    album_id: string;
    author_id: string;
    duration: number;
}

export type { ISong };