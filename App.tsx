import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { AudioPlayer } from './components/layout/AudioPlayer';
import { PlayerProvider } from './context/PlayerContext';
import { Home } from './pages/Home';
import { MakeMySongAI } from './pages/MakeMySongAI';
import { PickMySong } from './pages/PickMySong';
import { Dashboard } from './pages/Dashboard';

// Mock simple consulting page redirection for the prototype
const ConsultPage = () => <Navigate to="/dashboard" />;

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/make-ai" element={<MakeMySongAI />} />
            <Route path="/pick" element={<PickMySong />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/consult" element={<ConsultPage />} />
          </Routes>
          <AudioPlayer />
        </div>
      </Router>
    </PlayerProvider>
  );
};

export default App;