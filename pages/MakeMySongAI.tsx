
import React, { useState, useEffect } from 'react';
import { generateSongConcept } from '../services/geminiService';
import { generateMusic, pollForCompletion, SunoGenerationResponse } from '../services/sunoService';
import { Button } from '../components/ui/Button';
import { GENRE_OPTIONS, MOOD_OPTIONS } from '../constants';
import { Wand2, Music, CheckCircle2, Loader2, Mic2, Play, RefreshCw, Lock, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

const MAX_DAILY_FREE_LIMIT = 3;

export const MakeMySongAI: React.FC = () => {
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  
  // Usage Limit State
  const [dailyUsage, setDailyUsage] = useState(0);
  const [showCreditModal, setShowCreditModal] = useState(false);

  // Music Generation State
  const [isMusicGenerating, setIsMusicGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [generatedMusic, setGeneratedMusic] = useState<SunoGenerationResponse | null>(null);

  // Form State
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [theme, setTheme] = useState('');
  const [details, setDetails] = useState('');

  // Result State (Gemini)
  const [result, setResult] = useState<{ 
    title: string;
    lyrics: string; 
    melody: string; 
    structure: string;
    sunoPrompt: string;
  } | null>(null);

  // Check Daily Usage on Mount
  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('mms_last_usage_date');
    const count = parseInt(localStorage.getItem('mms_usage_count') || '0');

    if (lastDate !== today) {
      // 날짜가 바뀌었으면 리셋
      localStorage.setItem('mms_last_usage_date', today);
      localStorage.setItem('mms_usage_count', '0');
      setDailyUsage(0);
    } else {
      setDailyUsage(count);
    }
  }, []);

  const incrementUsage = () => {
    const newCount = dailyUsage + 1;
    setDailyUsage(newCount);
    localStorage.setItem('mms_usage_count', newCount.toString());
  };

  // Gemini Handler
  const handleGenerateConcept = async () => {
    // 1단계에서는 횟수 차감 안함 (가사만 만드는 것이므로)
    if (!genre || !mood || !theme) return;
    setLoading(true);
    try {
      const data = await generateSongConcept(genre, mood, theme, details);
      setResult(data);
      setStep(2);
    } catch (e) {
      alert("컨텐츠 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // Suno Handler
  const handleGenerateMusic = async () => {
    if (!result) return;
    
    // Check Limit
    if (dailyUsage >= MAX_DAILY_FREE_LIMIT) {
      setShowCreditModal(true);
      return;
    }

    setIsMusicGenerating(true);
    setGenerationStatus('API 요청 중...');
    setGeneratedMusic(null);
    
    try {
      // 1. Suno API로 생성 요청
      const taskId = await generateMusic(result.sunoPrompt, result.lyrics, result.title);
      
      // 2. 성공 시 카운트 증가
      incrementUsage();

      // 3. 완료될 때까지 폴링
      setGenerationStatus('대기열 등록 완료. 생성 시작...');
      const finalResult = await pollForCompletion(taskId, (status) => {
         let statusText = status;
         if(status === 'submitted') statusText = '대기열 등록됨';
         if(status === 'queueing') statusText = '순서 대기 중';
         if(status === 'processing') statusText = '생성 처리 중';
         if(status === 'streaming') statusText = '오디오 스트리밍 중';

         setGenerationStatus(`${statusText}...`);
      });

      setGeneratedMusic(finalResult);
    } catch (e: any) {
      console.error(e);
      alert(`음악 생성 실패: ${e.message}`);
      setGenerationStatus('오류 발생');
    } finally {
      setIsMusicGenerating(false);
    }
  };

  const handlePlayGenerated = () => {
    if (generatedMusic && generatedMusic.audio_url && result) {
        playSong({
            id: generatedMusic.id,
            title: result.title,
            artist: 'Suno AI',
            genre: genre,
            bpm: 0,
            key: '',
            price: 0,
            coverUrl: generatedMusic.image_url || 'https://picsum.photos/400/400',
            audioUrl: generatedMusic.audio_url,
            tags: ['AI Generated', 'Custom Mode'],
            description: result.sunoPrompt
        });
    }
  };

  const handleConsult = () => {
    navigate('/dashboard?new_project=ai_assisted');
  };

  // Mock Purchase Handler
  const handlePurchaseCredit = () => {
    alert("결제 시스템이 준비중입니다. (프로토타입: 횟수를 리셋합니다)");
    localStorage.setItem('mms_usage_count', '0');
    setDailyUsage(0);
    setShowCreditModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      {/* Daily Usage Indicator */}
      <div className="absolute top-0 right-4 sm:top-12 sm:right-0 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm flex items-center text-slate-600">
        <Coins className="w-4 h-4 mr-2 text-yellow-500" />
        오늘 남은 무료 생성: <span className="ml-1 text-indigo-600 font-bold">{Math.max(0, MAX_DAILY_FREE_LIMIT - dailyUsage)} / {MAX_DAILY_FREE_LIMIT}</span>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center mb-12 mt-8 sm:mt-0">
        <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-slate-300'}`}>
          <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">1</div>
          <span className="ml-2 font-medium">컨셉 설정</span>
        </div>
        <div className={`w-16 h-0.5 mx-4 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-slate-300'}`}>
          <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">2</div>
          <span className="ml-2 font-medium">AI 작사 & 작곡</span>
        </div>
        <div className={`w-16 h-0.5 mx-4 ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-slate-300'}`}>
          <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">3</div>
          <span className="ml-2 font-medium">최종 확인</span>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <Wand2 className="w-6 h-6 mr-2 text-indigo-500" />
                AI 작곡 시작하기
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">장르 (Genre)</label>
                <select 
                  className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border bg-white text-slate-900"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="">장르 선택</option>
                  {GENRE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">분위기 (Mood)</label>
                <select 
                  className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border bg-white text-slate-900"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                >
                  <option value="">분위기 선택</option>
                  {MOOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">주제 / 키워드</label>
              <input 
                type="text" 
                placeholder="예: 여름 해변에서의 사랑, 이별의 아픔, 화려한 도시의 밤 드라이브"
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border bg-white text-slate-900"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">추가 요청사항 (선택)</label>
              <textarea 
                rows={3}
                placeholder="원하는 악기 구성, 구체적인 스토리, 템포, 레퍼런스 곡 등을 자유롭게 적어주세요."
                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border bg-white text-slate-900"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <Button 
              fullWidth 
              size="lg" 
              onClick={handleGenerateConcept} 
              disabled={loading || !genre || !mood || !theme}
              className="mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Gemini가 생각 중...
                </>
              ) : (
                '컨셉 및 가사 생성하기'
              )}
            </Button>
          </div>
        </div>
      )}

      {step === 2 && result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lyrics View */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 flex flex-col h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <Mic2 className="w-5 h-5 mr-2 text-pink-500" />
              가사 (Lyrics)
            </h3>
            <div className="flex-1 bg-slate-50 p-6 rounded-xl text-slate-700 whitespace-pre-line leading-relaxed font-medium min-h-[400px] border border-slate-100 overflow-y-auto">
              {result.lyrics}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={handleGenerateConcept} disabled={loading || isMusicGenerating}>
                <RefreshCw className="w-4 h-4 mr-2" /> 다시 만들기
              </Button>
            </div>
          </div>

          {/* Music Info & Generation */}
          <div className="space-y-6 flex flex-col">
            {/* Concept Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <Music className="w-5 h-5 mr-2 text-indigo-500" />
                곡 정보
              </h3>
              <div className="space-y-4">
                <div>
                   <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">제목</label>
                   <p className="text-slate-900 font-bold text-lg">{result.title}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">스타일 태그 (Suno)</label>
                  <p className="text-indigo-600 font-medium text-sm bg-indigo-50 p-2 rounded mt-1 border border-indigo-100">
                    {result.sunoPrompt}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">곡 구성</label>
                  <p className="text-slate-800 font-medium text-sm">{result.structure}</p>
                </div>
              </div>
            </div>

            {/* Suno Generation Section */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-xl p-8 text-white flex-1 flex flex-col justify-center relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="flex justify-between items-start mb-2 relative z-10">
                 <h3 className="text-xl font-bold">음악 생성하기 (Suno AI)</h3>
               </div>

               {!generatedMusic ? (
                 <>
                   <p className="text-indigo-200 mb-6 text-sm break-keep relative z-10">
                     입력된 가사와 스타일로 실제 음악을 생성합니다. (남은 무료 횟수: {Math.max(0, MAX_DAILY_FREE_LIMIT - dailyUsage)}회)
                   </p>
                   
                   {isMusicGenerating ? (
                     <div className="text-center py-4 bg-white/10 rounded-xl relative z-10">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-400" />
                        <p className="text-sm font-medium animate-pulse">{generationStatus}</p>
                     </div>
                   ) : (
                     <Button 
                        onClick={handleGenerateMusic} 
                        className="bg-indigo-500 hover:bg-indigo-600 text-white w-full border-0 py-4 text-lg shadow-lg shadow-indigo-500/30 relative z-10"
                     >
                       <Music className="w-5 h-5 mr-2" /> 노래 만들기
                     </Button>
                   )}
                 </>
               ) : (
                 <div className="text-center relative z-10">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">생성 완료!</h3>
                    <p className="text-indigo-200 text-sm mb-6">나만의 노래가 완성되었습니다.</p>
                    
                    <div className="bg-white/10 rounded-xl p-4 mb-6 flex items-center gap-4">
                        <img src={generatedMusic.image_url || 'https://picsum.photos/400/400'} alt="Cover" className="w-16 h-16 rounded-lg bg-slate-800 object-cover" />
                        <div className="text-left flex-1 min-w-0">
                            <p className="font-bold truncate">{result.title}</p>
                            <p className="text-xs text-indigo-300 truncate">Suno AI Custom</p>
                        </div>
                        <button 
                            onClick={handlePlayGenerated}
                            className="w-10 h-10 rounded-full bg-white text-indigo-900 flex items-center justify-center hover:scale-105 transition"
                        >
                            <Play className="w-5 h-5 ml-1 fill-current" />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={handleConsult} className="flex-1 bg-white text-indigo-900 hover:bg-indigo-50 border-0">
                            전문가와 완성하기
                        </Button>
                        <Button variant="outline" className="border-indigo-400 text-indigo-100 hover:bg-white/10">
                            다운로드
                        </Button>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Credit Purchase Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">일일 무료 한도 초과</h3>
                <p className="text-slate-500 mb-6 text-sm">
                    하루 3곡의 무료 생성을 모두 사용하셨습니다.<br/>
                    계속 생성하려면 크레딧을 충전해주세요.
                </p>
                <div className="space-y-3">
                    <Button fullWidth onClick={handlePurchaseCredit} className="bg-yellow-500 hover:bg-yellow-600 text-white border-0">
                        크레딧 충전하기 (Mock)
                    </Button>
                    <Button fullWidth variant="ghost" onClick={() => setShowCreditModal(false)}>
                        닫기
                    </Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
