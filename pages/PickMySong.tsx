import React, { useState } from 'react';
import { MOCK_SONGS, GENRE_OPTIONS } from '../constants';
import { usePlayer } from '../context/PlayerContext';
import { Search, Filter, Play, Pause, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PickMySong: React.FC = () => {
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const [filterGenre, setFilterGenre] = useState('모든 장르');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = MOCK_SONGS.filter(song => {
    const matchesGenre = filterGenre === '모든 장르' || song.genre === filterGenre;
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Pick My Song</h1>
           <p className="text-slate-500 mt-1">내 프로젝트를 위한 고퀄리티 라이선스 음원</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
             <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               placeholder="곡 제목, 아티스트 검색..." 
               className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <select 
            className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="모든 장르">모든 장르</option>
            {GENRE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Song Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSongs.map(song => {
          const isCurrent = currentSong?.id === song.id;
          const active = isCurrent && isPlaying;

          return (
            <div key={song.id} className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition overflow-hidden group">
              <div className="relative aspect-square bg-slate-100">
                <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${active ? 'opacity-100' : ''}`}>
                  <button 
                    onClick={() => isCurrent ? togglePlay() : playSong(song)}
                    className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center hover:scale-110 transition"
                  >
                    {active ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
                  </button>
                </div>
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  {song.bpm} BPM
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 truncate pr-2">{song.title}</h3>
                    <p className="text-sm text-slate-500 truncate">{song.artist}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {song.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="font-bold text-lg text-indigo-600">{song.price.toLocaleString()}원</span>
                  <Button size="sm" variant="outline" className="text-xs">
                    <ShoppingCart className="w-3 h-3 mr-1.5" /> 구매하기
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredSongs.length === 0 && (
         <div className="text-center py-20">
            <p className="text-slate-500 text-lg">조건에 맞는 곡이 없습니다.</p>
         </div>
      )}
    </div>
  );
};