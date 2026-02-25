
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VideoCenter from './components/VideoCenter';
import EvidenceLocker from './components/EvidenceLocker';
import ServerConfig from './components/ServerConfig';
import { Icons } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Dashboard />;
      case 'video': return <VideoCenter />;
      case 'evidence': return <EvidenceLocker />;
      case 'config': return <ServerConfig />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              Terminal / {activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-mono text-slate-400">EDGE NODE: ACTIVE</span>
            </div>
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Icons.Activity />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right">
                <p className="text-xs font-bold text-white">Admin User</p>
                <p className="text-[10px] text-slate-500 font-mono">ID: SEC-8812</p>
              </div>
              <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#020617]">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </div>

        <footer className="h-10 border-t border-slate-800 bg-slate-900 flex items-center px-8 justify-between">
          <p className="text-[10px] text-slate-500 font-mono">© 2024 SCRAPSHIELD AI | SECURE CORE v3.1.2</p>
          <div className="flex gap-4">
            <span className="text-[10px] text-slate-500 font-mono">LAT: -33.9249</span>
            <span className="text-[10px] text-slate-500 font-mono">LNG: 18.4241</span>
            <span className="text-[10px] text-green-500 font-mono">NTP: SYNC_OK</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
