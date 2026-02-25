
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Icons, SERVER_IDENTITY } from '../constants';
import { SystemStats } from '../types';
import { analyzeSystemLogs } from '../services/geminiService';

const MOCK_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  load: Math.floor(Math.random() * 30) + 10,
  network: Math.floor(Math.random() * 50) + 40,
}));

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<SystemStats>({ cpu: 12, memory: 45, network: 128, storage: 32 });
  const [audit, setAudit] = useState<string>("Initializing Audit...");

  useEffect(() => {
    const fetchAudit = async () => {
      const summary = await analyzeSystemLogs("ComputerName: SCRAPSHIELD-EDGE, TimeZone: SAST, Folders Created: video, evidence, logs, models. Firewall: RTSP-554 Enabled, WebUI-80/443 Enabled. Services Hardened: DiagTrack, Fax, XblGameSave disabled.");
      setAudit(summary || "No data available.");
    };
    fetchAudit();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'CPU Load', value: `${stats.cpu}%`, icon: Icons.Cpu, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          { label: 'Memory', value: `${stats.memory}%`, icon: Icons.Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Net Throughput', value: `${stats.network} Mbps`, icon: Icons.Activity, color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { label: 'SSD Usage', value: `${stats.storage}%`, icon: Icons.HardDrive, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4 group hover:border-slate-700 transition-colors">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
              <stat.icon />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icons.Activity /> System Activity
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-cyan-400" /> CPU
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-indigo-500" /> Network
              </span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="load" stroke="#06b6d4" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={2} />
                <Area type="monotone" dataKey="network" stroke="#6366f1" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI System Audit */}
        <div className="bg-slate-950 border border-cyan-900/30 rounded-xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icons.Shield />
          </div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-cyan-400">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            AI Security Auditor
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
              <p className="text-sm leading-relaxed text-slate-300 font-mono italic">
                "{audit}"
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Compliance Checks</p>
              <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800">
                <span className="text-slate-400">Firewall Rules</span>
                <span className="text-green-400 font-bold">PASS</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800">
                <span className="text-slate-400">Service Hardening</span>
                <span className="text-green-400 font-bold">PASS</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800">
                <span className="text-slate-400">User Permissions</span>
                <span className="text-amber-400 font-bold">WARN</span>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition-colors">
            Run Deep Security Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
