interface IControls {
    type: string;
    min: number;
    max: number;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    skipBegin: () => void;
    skipEnd: () => void;
    togglePlayPause: () => void;
    progressBar: React.RefObject<HTMLInputElement>;
    audioPlayer: React.RefObject<HTMLAudioElement>;
    isPlaying: boolean;
    duration: string;
    current: string;
}

export type { IControls };