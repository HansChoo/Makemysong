import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music, User, Bell, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">MakeMySong</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/make-ai"
                className={`${isActive('/make-ai') ? 'border-indigo-500 text-slate-900' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                AI 작곡
              </Link>
              <Link
                to="/pick"
                className={`${isActive('/pick') ? 'border-indigo-500 text-slate-900' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Pick My Song
              </Link>
              <Link
                to="/dashboard"
                className={`${isActive('/dashboard') ? 'border-indigo-500 text-slate-900' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                대시보드
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <button className="p-2 rounded-full text-slate-400 hover:text-slate-500 hover:bg-slate-100 relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
             </button>
             <div className="relative ml-3">
               <div className="flex items-center">
                 <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-slate-300 transition">
                   <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                     <User className="h-5 w-5 text-slate-500" />
                   </div>
                 </button>
               </div>
             </div>
             <button className="sm:hidden p-2">
               <Menu className="w-6 h-6 text-slate-600"/>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};