
import React from 'react';
import { Icons } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', name: 'Overview', icon: Icons.Activity },
    { id: 'video', name: 'Video Streams', icon: Icons.Video },
    { id: 'evidence', name: 'Evidence Locker', icon: Icons.HardDrive },
    { id: 'config', name: 'Server Config', icon: Icons.Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="text-cyan-400">
          <Icons.Shield />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">SCRAPSHIELD</h1>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">AI Edge Node</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
            }`}
          >
            <span className={activeTab === item.id ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'}>
              <item.icon />
            </span>
            <span className="font-medium">{item.name}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">SYSTEM SECURE</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Uptime: 14d 06h 22m</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
