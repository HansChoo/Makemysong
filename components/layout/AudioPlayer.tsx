import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const AudioPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, pauseSong } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastWatermarkTime, setLastWatermarkTime] = useState(0);

  // Play/Pause Control
  useEffect(() => {
    if (currentSong && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Playback failed:", e);
          pauseSong();
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, pauseSong]);

  // Voice Tag (Watermark) Logic
  const playVoiceTag = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Make My Song");
      utterance.lang = 'en-US'; // 영어 발음으로 명확하게
      utterance.rate = 1.1; // 약간 빠르게
      utterance.volume = 0.4; // 배경음보다 작게 (0.0 ~ 1.0)
      
      // 현재 말하고 있는게 있다면 취소하고 즉시 실행 (겹침 방지)
      window.speechSynthesis.cancel(); 
      window.speechSynthesis.speak(utterance);
    }
  };

  // Time Update Handler
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);

      // Watermark Logic: 10초 간격으로 재생 (0초 제외)
      // Math.floor(current)를 사용하여 정수 초 단위로 체크
      const timeInt = Math.floor(current);
      if (timeInt > 0 && timeInt % 10 === 0 && timeInt !== lastWatermarkTime) {
        playVoiceTag();
        setLastWatermarkTime(timeInt);
      }
    }
  };

  const handleEnded = () => {
    pauseSong();
    setProgress(0);
    setCurrentTime(0);
    setLastWatermarkTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (Number(e.target.value) / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 px-4 sm:px-8 flex items-center justify-between">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {/* Track Info */}
      <div className="flex items-center w-1/3 min-w-[150px]">
        <div className="relative group">
            <img 
              src={currentSong.coverUrl} 
              alt={currentSong.title} 
              className={`h-12 w-12 rounded bg-slate-200 object-cover shadow-sm ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
            />
            {/* Playing Indicator */}
            {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                    <div className="flex space-x-0.5 h-3">
                        <div className="w-1 bg-white animate-[bounce_1s_infinite]"></div>
                        <div className="w-1 bg-white animate-[bounce_1.2s_infinite]"></div>
                        <div className="w-1 bg-white animate-[bounce_0.8s_infinite]"></div>
                    </div>
                </div>
            )}
        </div>
        <div className="ml-3 truncate">
          <p className="text-sm font-semibold text-slate-900 truncate">{currentSong.title}</p>
          <p className="text-xs text-slate-500 truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-6 mb-1">
          <button className="text-slate-400 hover:text-slate-600 transition">
            <SkipBack className="w-5 h-5" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white hover:scale-105 transition shadow-md"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full max-w-md flex items-center space-x-2 text-xs text-slate-400">
          <span className="w-8 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 relative h-1 bg-slate-200 rounded-full group">
             {/* Custom Seek Bar */}
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress} 
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
                className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" 
                style={{ width: `${progress}%` }}
            ></div>
            {/* Thumb indicator on hover */}
            <div 
                className="absolute top-1/2 -mt-1.5 h-3 w-3 bg-white border-2 border-indigo-500 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 6px)` }}
            ></div>
          </div>
          <span className="w-8">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end w-1/3 space-x-4">
        <div className="hidden sm:flex items-center space-x-2 group">
          <Volume2 className="w-4 h-4 text-slate-400" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            className="w-20 h-1 bg-slate-200 rounded-full accent-slate-500 cursor-pointer"
            onChange={(e) => {
                if(audioRef.current) audioRef.current.volume = Number(e.target.value);
            }}
          />
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};