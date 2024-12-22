import { ISong } from "./SongInterface";

interface ISongInfoModal {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    skipBegin: () => void;
    skipEnd: () => void;
    current: string;
    duration: string;
    type: string;
    min: number;
    max: number;
    value: number;
    isPlaying: boolean;
    progressBar: React.RefObject<HTMLInputElement>;
    song: ISong;
    onClose: () => void;
    onPlayPause: (song: ISong) => void;
}

export type { ISongInfoModal };