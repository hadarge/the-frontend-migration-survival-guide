import React, {useState, useRef, useEffect} from 'react';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    SkipBack,
    SkipForward,
    Settings
} from 'lucide-react';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    width?: number;
    height?: number;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
                                                            src,
                                                            poster,
                                                            width = 800,
                                                            height = 450,
                                                            autoPlay = true,
                                                            muted = false,
                                                            loop = false,
                                                            controls = true,
                                                            onTimeUpdate,
                                                            onPlay,
                                                            onPause,
                                                            onEnded
                                                        }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(muted);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [showControls, setShowControls] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const controlsTimeoutRef = useRef<any>(0);

    // Format time display
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Toggle play/pause
    const togglePlayPause = (): void => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            onPause?.();
        } else {
            videoRef.current.play();
            setIsPlaying(true);
            onPlay?.();
        }
    };

    // Handle time update
    const handleTimeUpdate = (): void => {
        if (!videoRef.current) return;

        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;

        setCurrentTime(current);
        onTimeUpdate?.(current, total);
    };

    // Handle video loaded
    const handleLoadedMetadata = (): void => {
        if (!videoRef.current) return;
        setDuration(videoRef.current.duration);
        setIsLoaded(true);
    };

    // Handle video ended
    const handleEnded = (): void => {
        setIsPlaying(false);
        onEnded?.();
    };

    // Seek to specific time
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!videoRef.current) return;

        const seekTime = parseFloat(e.target.value);
        videoRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    // Handle volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!videoRef.current) return;

        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
    };

    // Toggle mute
    const toggleMute = (): void => {
        if (!videoRef.current) return;

        if (isMuted) {
            videoRef.current.volume = volume;
            setIsMuted(false);
        } else {
            videoRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    // Skip forward/backward
    const skipTime = (seconds: number): void => {
        if (!videoRef.current) return;

        const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Toggle fullscreen
    const toggleFullscreen = (): void => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Show/hide controls
    const showControlsTemporarily = (): void => {
        setShowControls(true);

        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }

        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, []);

    // Handle fullscreen change
    useEffect(() => {
        const handleFullscreenChange = (): void => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className="relative bg-black rounded-lg overflow-hidden shadow-lg"
            style={{width, height}}
            onMouseMove={showControlsTemporarily}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                width={width}
                height={height}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onClick={togglePlayPause}
                className="w-full h-full object-cover cursor-pointer"
            />

            {/* Loading Overlay */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}

            {/* Custom Controls */}
            {controls && (
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300 ${
                        showControls ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Progress Bar */}
                    <div className="mb-4">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`
                            }}
                        />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* Skip Back */}
                            <button
                                onClick={() => skipTime(-10)}
                                className="text-white hover:text-red-400 transition-colors"
                                aria-label="Skip back 10 seconds"
                            >
                                <SkipBack size={20}/>
                            </button>

                            {/* Play/Pause */}
                            <button
                                onClick={togglePlayPause}
                                className="text-white hover:text-red-400 transition-colors"
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? <Pause size={24}/> : <Play size={24}/>}
                            </button>

                            {/* Skip Forward */}
                            <button
                                onClick={() => skipTime(10)}
                                className="text-white hover:text-red-400 transition-colors"
                                aria-label="Skip forward 10 seconds"
                            >
                                <SkipForward size={20}/>
                            </button>

                            {/* Volume Controls */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={toggleMute}
                                    className="text-white hover:text-red-400 transition-colors"
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Time Display */}
                            <div className="text-white text-sm font-mono">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {/* Settings */}
                            <button
                                className="text-white hover:text-red-400 transition-colors"
                                aria-label="Settings"
                            >
                                <Settings size={20}/>
                            </button>

                            {/* Fullscreen */}
                            <button
                                onClick={toggleFullscreen}
                                className="text-white hover:text-red-400 transition-colors"
                                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            >
                                {isFullscreen ? <Minimize size={20}/> : <Maximize size={20}/>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
