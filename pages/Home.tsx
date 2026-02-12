import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mic2, Music4, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <header className="bg-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            꿈꾸던 나만의 노래 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
              지금 바로 현실로
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-10 break-keep">
            AI 작곡부터 전문 프로듀서와의 협업까지. 
            초보자부터 전문가까지 모두를 위한 올인원 음악 제작 플랫폼입니다.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/make-ai">
              <Button size="lg" className="shadow-lg shadow-indigo-200">AI로 시작하기</Button>
            </Link>
            <Link to="/pick">
              <Button variant="outline" size="lg">곡 둘러보기</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 bg-slate-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">어떤 서비스를 찾으시나요?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: AI */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI 작곡 (Make My Song)</h3>
              <p className="text-slate-500 mb-6 break-keep">
                음악을 몰라도 괜찮습니다. 키워드만 입력하면 AI가 세상에 단 하나뿐인 가사와 멜로디를 만들어드립니다.
              </p>
              <ul className="space-y-2 mb-8 text-sm text-slate-600">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>즉시 생성 및 확인</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>다양한 장르 & 분위기 선택</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>전문가 편곡 연계 가능</li>
              </ul>
              <Link to="/make-ai">
                <Button fullWidth variant="outline">AI 작곡 체험하기 <ArrowRight className="w-4 h-4 ml-2"/></Button>
              </Link>
            </div>

            {/* Card 2: Expert */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <Mic2 className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">전문가 1:1 제작</h3>
              <p className="text-slate-500 mb-6 break-keep">
                현업 프로듀서와 1:1로 작업하세요. 당신의 이야기를 고퀄리티 음원으로 완성해 드립니다.
              </p>
               <ul className="space-y-2 mb-8 text-sm text-slate-600">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></div>1:1 맞춤 상담</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></div>전문 스튜디오 레코딩</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></div>저작권 100% 소유</li>
              </ul>
              <Link to="/consult">
                <Button fullWidth variant="outline">전문가 의뢰하기 <ArrowRight className="w-4 h-4 ml-2"/></Button>
              </Link>
            </div>

            {/* Card 3: Marketplace */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Music4 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pick My Song</h3>
              <p className="text-slate-500 mb-6 break-keep">
                엄선된 고퀄리티 음원을 구매하여 내 콘텐츠에 바로 사용하세요. 합리적인 가격의 라이선스 마켓입니다.
              </p>
               <ul className="space-y-2 mb-8 text-sm text-slate-600">
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>즉시 라이선스 발급</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>스템(Stems) 파일 제공</li>
                <li className="flex items-center"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>보컬 가이드 포함</li>
              </ul>
              <Link to="/pick">
                <Button fullWidth variant="outline">스토어 둘러보기 <ArrowRight className="w-4 h-4 ml-2"/></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};