import { SearchOutline } from "react-ionicons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faVolumeUp, faVolumeMute, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useState, useRef } from "react";

interface Song {
    id: number;
    name: string;
    artist: string;
    genre: string;
    file_path: string;
    thumb: string;
}

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleLoginClick = () => {
        window.location.href = "http://127.0.0.1:8000/login";
    };

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/search`, {
                    params: { query }
                });
                console.log("Search results:", response.data); 
                const updatedResults = response.data.map((song: Song) => ({
                    ...song,
                    thumb: song.thumb?.startsWith('http') ? song.thumb : `http://127.0.0.1:8000/storage/uploads${song.thumb}`
                }));
                setSearchResults(updatedResults);
            } catch (error) {
                console.error("Lỗi tìm kiếm:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePlaySong = (song: Song) => {
        const fullThumbUrl = song.thumb.startsWith('http') ? song.thumb : `http://127.0.0.1:8000/storage/uploads${song.thumb}`;
        console.log("Playing song:", song); 
        console.log("Song thumbnail URL:", fullThumbUrl); 
        setCurrentSong({ ...song, thumb: fullThumbUrl });
        setIsPlaying(true);
        setTimeout(() => audioRef.current?.play(), 0);
    };

    const handleNextSong = () => {
        if (currentSong) {
            const currentIndex = searchResults.findIndex(song => song.id === currentSong.id);
            const nextIndex = (currentIndex + 1) % searchResults.length;
            handlePlaySong(searchResults[nextIndex]);
        }
    };

    const handlePrevSong = () => {
        if (currentSong) {
            const currentIndex = searchResults.findIndex(song => song.id === currentSong.id);
            const prevIndex = (currentIndex - 1 + searchResults.length) % searchResults.length;
            handlePlaySong(searchResults[prevIndex]);
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

    const handleStop = () => {
        audioRef.current?.pause();
        setCurrentSong(null);
        setIsPlaying(false);
    };

    return (
        <div className="bg-[#121212] w-full h-12 px-5 py-7 fixed top-0 pl-[350px] md:flex hidden items-center justify-between z-20">
            <div className="flex items-center gap-3 w-[350px] h-12 px-3">
                <SearchOutline color={"#b3b3b3"} onClick={handleSearch} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="outline-none bg-[#121212] w-full placeholder:text-[#b3b3b3]"
                />
            </div>
            <div className="flex items-center gap-3">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700"
                    onClick={handleLoginClick}
                    >Đăng xuất
                </button>
            </div>

            <div>
                {searchResults.length > 0 && (
                    <div className="search-results absolute top-14 left-0 w-full bg-[#121212] z-50 max-h-60 overflow-y-auto shadow-lg" style={{ marginLeft: '350px' }}>
                        <ul>
                            {searchResults.map((song) => (
                                <li key={song.id} className="text-white p-2 border-b border-gray-700">
                                    <div>{song.name} - {song.artist}</div>
                                    <div className="text-sm text-gray-400">{song.genre}</div>
                                    <button onClick={() => handlePlaySong(song)} className="text-sm text-blue-400">Listen</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {currentSong && (
                <div className="fixed bottom-0 left-[350px] right-0 bg-gray-800 p-4 flex items-center justify-between" style={{ zIndex: 31 }}>
                    <div className="flex items-center gap-4">
                       
                        <div>
                            <div className="text-lg font-semibold">{currentSong.name}</div>
                            <div className="text-sm text-gray-400">{currentSong.artist}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={handlePrevSong}>
                            <FontAwesomeIcon icon={faStepBackward} className="text-2xl" />
                        </button>
                        <button onClick={handlePlayPause}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-2xl" />
                        </button>
                        <button onClick={handleNextSong}>
                            <FontAwesomeIcon icon={faStepForward} className="text-2xl" />
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
                    <audio ref={audioRef} src={`http://127.0.0.1:8000${currentSong.file_path}`} onEnded={handleNextSong} />
                </div>
            )}
        </div>
    );
};

export default Navbar;