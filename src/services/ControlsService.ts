import { useRef, useState, useEffect } from "react";

interface IControlsService {
    songs: ISong[];
    currentSongIndex: number;
    setCurrentSongIndex: React.Dispatch<React.SetStateAction<number>>;
    repeatMode: 'off' | 'one' | 'all';
}

export interface ISong {
    id: number;
    created_at: string;
    audio_link: string;
    author: string;
    article: string;
    image_link: string;
    album_id: string;
    author_id: string;
}

const useControlsService = ({ songs, currentSongIndex, setCurrentSongIndex, repeatMode }: IControlsService) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioPlayer = useRef<HTMLAudioElement>(new Audio());
    const progressBar = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const audio = audioPlayer.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [audioPlayer]);

    useEffect(() => {
        const audio = audioPlayer.current;

        if ('mediaSession' in navigator && songs.length > 0) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: songs[currentSongIndex].article,
                artist: songs[currentSongIndex].author,
                artwork: [
                    { src: songs[currentSongIndex].image_link, sizes: '96x96', type: 'image/png' },
                    { src: songs[currentSongIndex].image_link, sizes: '128x128', type: 'image/png' },
                    { src: songs[currentSongIndex].image_link, sizes: '192x192', type: 'image/png' },
                    { src: songs[currentSongIndex].image_link, sizes: '256x256', type: 'image/png' },
                    { src: songs[currentSongIndex].image_link, sizes: '384x384', type: 'image/png' },
                    { src: songs[currentSongIndex].image_link, sizes: '512x512', type: 'image/png' },
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => {
                audio.play();

                setIsPlaying(true);
            });

            navigator.mediaSession.setActionHandler('pause', () => {
                audio.pause();

                setIsPlaying(false);
            });

            navigator.mediaSession.setActionHandler('previoustrack', () => {
                audio.currentTime = 0;
                if (currentSongIndex > 0) {
                    setCurrentSongIndex(currentSongIndex - 1);
                }
            });

            navigator.mediaSession.setActionHandler('nexttrack', () => {
                audio.currentTime = 0;
                if (currentSongIndex < songs.length - 1) {
                    setCurrentSongIndex(currentSongIndex + 1);
                }
            });

            navigator.mediaSession.setActionHandler('seekbackward', () => {
                audio.currentTime = Math.max(audio.currentTime - 10, 0);
            });

            navigator.mediaSession.setActionHandler('seekforward', () => {
                audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
            });

            navigator.mediaSession.setActionHandler('stop', () => {
                audio.pause();
                audio.currentTime = 0;

                setIsPlaying(false);
            });
        }

        return () => {
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = null;
            }
        };
    }, [songs, currentSongIndex, setCurrentSongIndex, setIsPlaying]);

    useEffect(() => {
        const loadSong = async () => {
            if (songs.length > 0) {
                const song = songs[currentSongIndex];
                const previousTime = audioPlayer.current.currentTime;

                audioPlayer.current.src = song.audio_link;
                audioPlayer.current.load();
                audioPlayer.current.currentTime = previousTime;

                if (isPlaying) {
                    audioPlayer.current.play();
                }
            }
        };

        loadSong();
    }, [currentSongIndex, songs, isPlaying]);

    useEffect(() => {
        const audio = audioPlayer.current;

        const handleEnded = () => {
            if (repeatMode === 'one') {
                audio.currentTime = 0;
                audio.play();
            } 
            
            else if (repeatMode === 'all') {
                if (currentSongIndex < songs.length - 1) {
                    setCurrentSongIndex(currentSongIndex + 1);
                } 
                
                else {
                    setCurrentSongIndex(0);
                }

                audio.currentTime = 0;
            } 
            
            else {
                if (currentSongIndex < songs.length - 1) {
                    setCurrentSongIndex(currentSongIndex + 1);
                } 
                
                else {
                    setCurrentSongIndex(0);
                }
                audio.currentTime = 0;
            }
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentSongIndex, setCurrentSongIndex, songs, repeatMode]);

    const togglePlayPause = () => {
        const audio = audioPlayer.current;

        if (isPlaying) {
            audio.pause();
        } 
        
        else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds}`;
    };

    const handleProgressChange = () => {
        if (audioPlayer.current && progressBar.current) {
            audioPlayer.current.currentTime = Number(progressBar.current.value);
        }
    };

    const skipBegin = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }

        audioPlayer.current.currentTime = 0;
    };

    const skipEnd = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        }

        audioPlayer.current.currentTime = 0;
    };

    return {
        isPlaying,
        currentTime,
        duration,
        progressBar,
        audioPlayer,
        togglePlayPause,
        handleProgressChange,
        skipBegin,
        skipEnd,
        currentFormatted: formatTime(currentTime),
        durationFormatted: formatTime(duration),
        repeatMode,
    };
};

export default useControlsService;
