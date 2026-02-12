import React, { useState } from 'react';
import { MOCK_PROJECTS } from '../constants';
import { Project, ChatMessage, ProjectStatus } from '../types';
import { MessageSquare, FolderOpen, Download, Clock, Send, Paperclip } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'library'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(MOCK_PROJECTS[0] || null);
  const [newMessage, setNewMessage] = useState('');

  // Mock Chat History
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { id: '1', senderId: 'expert', text: '안녕하세요! 전달주신 AI 초안 확인했습니다. 발라드 감성이 아주 좋네요.', timestamp: '오전 10:00' },
    { id: '2', senderId: 'user', text: '감사합니다. 후렴구에서 조금 더 감정이 고조되게 편곡하고 싶어요.', timestamp: '오전 10:05' },
    { id: '3', senderId: 'expert', text: '알겠습니다. 피아노와 스트링을 중심으로 데모를 작업해서 내일까지 보내드리겠습니다.', timestamp: '오전 10:10' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory([...chatHistory, msg]);
    setNewMessage('');
    
    // Simulate automated reply
    setTimeout(() => {
        const reply: ChatMessage = {
            id: (Date.now() + 1).toString(),
            senderId: 'expert',
            text: "확인했습니다. 추가로 궁금한 점 있으신가요?",
            timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory(prev => [...prev, reply]);
    }, 1500);
  };

  const statusMap = {
    [ProjectStatus.AI_GENERATED]: 'AI 생성 완료',
    [ProjectStatus.CONSULTATION]: '상담 진행 중',
    [ProjectStatus.PRODUCTION]: '제작 진행 중',
    [ProjectStatus.COMPLETED]: '제작 완료',
    [ProjectStatus.DEMO_RECEIVED]: '데모 수령',
  };

  const statusColors = {
    [ProjectStatus.AI_GENERATED]: 'bg-slate-100 text-slate-600',
    [ProjectStatus.CONSULTATION]: 'bg-yellow-100 text-yellow-700',
    [ProjectStatus.PRODUCTION]: 'bg-indigo-100 text-indigo-700',
    [ProjectStatus.COMPLETED]: 'bg-emerald-100 text-emerald-700',
    [ProjectStatus.DEMO_RECEIVED]: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center space-x-6 mb-6 border-b border-slate-200">
        <button 
            className={`pb-4 text-sm font-medium border-b-2 ${activeTab === 'projects' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500'}`}
            onClick={() => setActiveTab('projects')}
        >
            내 프로젝트
        </button>
        <button 
            className={`pb-4 text-sm font-medium border-b-2 ${activeTab === 'library' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500'}`}
            onClick={() => setActiveTab('library')}
        >
            라이브러리 & 다운로드
        </button>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        {/* Project List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-semibold text-slate-700">진행 중인 프로젝트</h2>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {MOCK_PROJECTS.map(project => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`p-4 rounded-lg cursor-pointer transition border ${selectedProject?.id === project.id ? 'border-indigo-500 bg-indigo-50' : 'border-transparent hover:bg-slate-50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-slate-900">{project.title}</h3>
                   <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                     {statusMap[project.status]}
                   </span>
                </div>
                <div className="flex items-center text-xs text-slate-500">
                   <Clock className="w-3 h-3 mr-1" /> 최근 업데이트: {new Date(project.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace / Chat */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          {selectedProject ? (
            <>
              {/* Workspace Header */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div>
                    <h2 className="font-bold text-slate-800">{selectedProject.title}</h2>
                    <p className="text-xs text-slate-500">
                        {selectedProject.expertName ? `담당: ${selectedProject.expertName}` : '셀프 서비스'}
                    </p>
                 </div>
                 <div className="flex space-x-2">
                    <Button size="sm" variant="outline"><FolderOpen className="w-4 h-4 mr-2"/> 파일</Button>
                    {selectedProject.status === ProjectStatus.COMPLETED && (
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700"><Download className="w-4 h-4 mr-2"/> 마스터 음원</Button>
                    )}
                 </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                 {/* System Notice */}
                 <div className="flex justify-center">
                    <span className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded-full">
                        프로젝트 시작일: 2023년 10월 20일
                    </span>
                 </div>

                 {chatHistory.map(msg => (
                    <div key={msg.id} className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                            msg.senderId === 'user' 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                        }`}>
                            <p>{msg.text}</p>
                            <span className={`text-[10px] block mt-1 ${msg.senderId === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                                {msg.timestamp}
                            </span>
                        </div>
                    </div>
                 ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="프로듀서에게 메시지를 보내세요..."
                        className="flex-1 border-0 bg-slate-100 rounded-lg px-4 focus:ring-2 focus:ring-indigo-500"
                    />
                    <Button type="submit" size="sm" className="w-12 px-0">
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <MessageSquare className="w-12 h-12 mb-2 opacity-20" />
                <p>프로젝트를 선택하여 상세 내용을 확인하세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};