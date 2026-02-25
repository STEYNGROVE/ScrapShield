
import React from 'react';
import { Icons, SERVER_IDENTITY } from '../constants';

const EvidenceLocker: React.FC = () => {
  const folders = [
    { name: 'Raw Video', path: 'video\\raw', count: 1422, size: '2.4 TB' },
    { name: 'Events', path: 'video\\events', count: 85, size: '412 GB' },
    { name: 'Evidence', path: 'evidence\\', count: 12, size: '4 GB' },
    { name: 'Exports', path: 'exports\\', count: 5, size: '1.2 GB' },
  ];

  const recentFiles = [
    { id: 'EV-20240315-01', name: 'Face_Recog_DockA_001.mp4', type: 'Video', date: 'Mar 15, 2024', size: '124 MB', secure: true },
    { id: 'EV-20240315-02', name: 'Intrusion_Log_System.txt', type: 'Log', date: 'Mar 15, 2024', size: '12 KB', secure: true },
    { id: 'EV-20240314-05', name: 'Plate_Match_Gate_99.jpg', type: 'Image', date: 'Mar 14, 2024', size: '2 MB', secure: true },
    { id: 'EV-20240314-04', name: 'Night_Patrol_South.mp4', type: 'Video', date: 'Mar 14, 2024', size: '2 GB', secure: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Evidence Locker</h2>
          <p className="text-slate-400 text-sm">Target Storage: {SERVER_IDENTITY.basePath}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <Icons.HardDrive /> Rebuild Index
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold transition-colors">
            Secure Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {folders.map((folder, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-xl group hover:border-cyan-500/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20">
                <Icons.HardDrive />
              </div>
              <span className="text-[10px] font-mono text-slate-500">{folder.size}</span>
            </div>
            <h4 className="font-bold text-white mb-1">{folder.name}</h4>
            <p className="text-xs text-slate-500 font-mono mb-3">{folder.path}</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-white">{folder.count}</span> items tracked
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Recent Evidence (Immutable)</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-mono text-slate-500 border-b border-slate-800">
              <th className="px-6 py-4 font-normal">ID</th>
              <th className="px-6 py-4 font-normal">FILE NAME</th>
              <th className="px-6 py-4 font-normal">DATE</th>
              <th className="px-6 py-4 font-normal">SIZE</th>
              <th className="px-6 py-4 font-normal">HASH INTEGRITY</th>
              <th className="px-6 py-4 font-normal"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {recentFiles.map((file) => (
              <tr key={file.id} className="hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{file.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className={`p-1.5 rounded bg-slate-800 text-slate-400 ${file.type === 'Video' ? 'text-cyan-400' : ''}`}>
                      {file.type === 'Video' ? <Icons.Video /> : <Icons.HardDrive />}
                    </span>
                    <span className="text-sm text-slate-200 group-hover:text-white transition-colors">{file.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">{file.date}</td>
                <td className="px-6 py-4 text-xs text-slate-400 font-mono">{file.size}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${file.secure ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-amber-500'}`} />
                    <span className={`text-[10px] font-bold ${file.secure ? 'text-green-500' : 'text-amber-500'}`}>
                      {file.secure ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                    <Icons.Activity />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 bg-slate-950/50 text-center">
          <button className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Load More Secure Archives
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceLocker;
