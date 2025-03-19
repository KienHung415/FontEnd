import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faVolumeUp, faVolumeMute, faRandom, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Song {
    thumb: string;
    name: string;
    artist: string;
    file_path: string;
}

const SongList = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!loaded) {
            axios.get('http://localhost:8000/api/products')
                .then((response) => {
                    setSongs(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error('Error fetching songs:', error);
                });
        }
    }, [loaded]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (currentSong) {
            const currentIndex = songs.findIndex(song => song.file_path === currentSong.file_path);
            const nextIndex = (currentIndex + 1) % songs.length;
            setCurrentSong(songs[nextIndex]);
            setIsPlaying(true);
            setTimeout(() => audioRef.current?.play(), 0); 
        }
    };

    const handlePrev = () => {
        if (currentSong) {
            const currentIndex = songs.findIndex(song => song.file_path === currentSong.file_path);
            const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
            setCurrentSong(songs[prevIndex]);
            setIsPlaying(true);
            setTimeout(() => audioRef.current?.play(), 0); 
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.volume = Number(event.target.value) / 100;
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleRandomPlay = () => {
        const randomIndex = Math.floor(Math.random() * songs.length);
        setCurrentSong(songs[randomIndex]);
        setIsPlaying(true);
        setTimeout(() => audioRef.current?.play(), 0);
    };

    const handleStop = () => {
        audioRef.current?.pause();
        setCurrentSong(null);
        setIsPlaying(false);
    };

    return (
        <div style={{ paddingBottom: '50px' }}>
            <ul>
                {songs.map((song: Song, index: number) => (
                    <li key={index} className="flex items-center gap-4 mb-4">
                        <img src={song.thumb} alt={song.name} className="w-16 h-16 rounded-lg" />
                        <div>
                            <div className="text-lg font-semibold">{song.name}</div>
                            <div className="text-sm text-gray-400">{song.artist}</div>
                            <button onClick={() => { setCurrentSong(song); setIsPlaying(true); setTimeout(() => audioRef.current?.play(), 0); }}>
                                <FontAwesomeIcon icon={faPlay} className="text-2xl" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {currentSong && (
                <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-between" style={{ zIndex: 1000 }}>
                    <div className="flex items-center gap-4">
                        <img src={currentSong.thumb} alt={currentSong.name} className="w-16 h-16 rounded-lg" />
                        <div>
                            <div className="text-lg font-semibold">{currentSong.name}</div>
                            <div className="text-sm text-gray-400">{currentSong.artist}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={handlePrev}>
                            <FontAwesomeIcon icon={faStepBackward} className="text-2xl" />
                        </button>
                        <button onClick={handlePlayPause}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-2xl" />
                        </button>
                        <button onClick={handleNext}>
                            <FontAwesomeIcon icon={faStepForward} className="text-2xl" />
                        </button>
                        <button onClick={handleRandomPlay}>
                            <FontAwesomeIcon icon={faRandom} className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={toggleMute}>
                            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="text-2xl" />
                        </button>
                        <input type="range" min="0" max="100" onChange={handleVolumeChange} />
                    </div>
                    <button onClick={handleStop}>
                        <FontAwesomeIcon icon={faTimes} className="text-2xl" />
                    </button>
                    <audio ref={audioRef} src={currentSong.file_path} onEnded={handleNext} />
                </div>
            )}
        </div>
    );
};

export default SongList;