
import React, { useState } from 'react';
import { Icons } from '../constants';

type CameraStatus = 'connected' | 'disconnected' | 'warning' | 'idle';

interface Camera {
  name: string;
  url: string;
  status: CameraStatus;
  ip: string;
}

const VideoCenter: React.FC = () => {
  const [activeCamera, setActiveCamera] = useState(0);

  const cameras: Camera[] = [
    { name: 'Loading Dock A', url: 'https://picsum.photos/seed/docka/800/450', status: 'connected', ip: '192.168.10.21' },
    { name: 'Main Gate', url: 'https://picsum.photos/seed/gate/800/450', status: 'connected', ip: '192.168.10.22' },
    { name: 'Server Room', url: 'https://picsum.photos/seed/server/800/450', status: 'idle', ip: '192.168.10.23' },
    { name: 'Parking South', url: 'https://picsum.photos/seed/parking/800/450', status: 'disconnected', ip: '192.168.10.24' },
  ];

  const events = [
    { id: 1, type: 'Motion', camera: 'Main Gate', time: '14:22:10', thumb: 'https://picsum.photos/seed/e1/150/100' },
    { id: 2, type: 'Face Match', camera: 'Loading Dock A', time: '14:15:05', thumb: 'https://picsum.photos/seed/e2/150/100' },
    { id: 3, type: 'Loitering', camera: 'Parking South', time: '13:58:33', thumb: 'https://picsum.photos/seed/e3/150/100' },
  ];

  const getStatusColor = (status: CameraStatus) => {
    switch (status) {
      case 'connected': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
      case 'disconnected': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      case 'warning': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]';
      case 'idle': return 'bg-slate-500';
      default: return 'bg-slate-700';
    }
  };

  const getStatusLabel = (status: CameraStatus) => {
    switch (status) {
      case 'connected': return 'LIVE';
      case 'disconnected': return 'LOST';
      case 'warning': return 'SIGNAL WEAK';
      case 'idle': return 'STANDBY';
      default: return 'UNKNOWN';
    }
  };

  const activeCam = cameras[activeCamera];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Main Stream Area */}
      <div className="lg:col-span-3 space-y-4">
        <div className="relative bg-black rounded-xl overflow-hidden aspect-video border border-slate-800 shadow-2xl group">
          {activeCam.status === 'disconnected' ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-700">
               <div className="scale-[3] mb-8 animate-pulse text-red-900">
                 <Icons.AlertTriangle />
               </div>
               <p className="font-mono text-lg uppercase tracking-widest font-bold">Signal Lost - Reconnecting...</p>
               <p className="text-xs mt-2 opacity-50">{activeCam.ip}</p>
            </div>
          ) : (
            <img 
              src={activeCam.url} 
              alt="Camera stream" 
              className={`w-full h-full object-cover transition-opacity duration-700 ${activeCam.status === 'warning' ? 'opacity-40 grayscale' : 'opacity-80 group-hover:opacity-100'}`}
            />
          )}
          
          <div className="absolute top-0 left-0 p-4 bg-gradient-to-b from-black/80 to-transparent w-full">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(activeCam.status)} ${activeCam.status === 'connected' ? 'animate-pulse' : ''}`} />
                  {getStatusLabel(activeCam.status)}: {activeCam.name}
                </h2>
                <p className="text-xs text-slate-400 font-mono tracking-tighter">{activeCam.ip} | RTSP OVER TCP (554)</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-900/80 hover:bg-slate-700 rounded-lg text-white border border-slate-700">
                  <Icons.Settings />
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 p-6 w-full flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-4">
              <div className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                activeCam.status === 'connected' 
                ? 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30' 
                : 'bg-slate-800/50 text-slate-500 border-slate-700'
              }`}>
                AI TRACKING {activeCam.status === 'connected' ? 'ON' : 'OFF'}
              </div>
              <div className="px-2 py-1 bg-white/10 text-white rounded text-[10px] font-bold border border-white/20">720P @ 24FPS</div>
            </div>
            <div className="text-slate-400 font-mono text-sm tracking-widest uppercase">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Camera Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cameras.map((cam, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCamera(idx)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all group/btn ${
                activeCamera === idx ? 'border-cyan-500 scale-105 z-10' : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="relative">
                <img src={cam.url} className={`w-full aspect-video object-cover ${cam.status === 'disconnected' ? 'grayscale opacity-50' : ''}`} alt={cam.name} />
                
                {/* Status Overlay for selector */}
                <div className="absolute top-2 right-2">
                   <div className={`w-2.5 h-2.5 rounded-full border border-black/50 ${getStatusColor(cam.status)} ${cam.status === 'connected' ? 'animate-pulse' : ''}`} />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-2 bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white truncate flex items-center justify-between">
                <span>{cam.name}</span>
                {activeCamera === idx && <div className="w-1 h-1 rounded-full bg-cyan-400" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Event Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2 text-slate-200">
            <Icons.Activity /> AI Event Feed
          </h3>
          <span className="text-[10px] px-2 py-0.5 bg-slate-800 rounded-full text-slate-400">TODAY</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {events.map((event) => (
            <div key={event.id} className="group relative bg-slate-950 border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-colors">
              <img src={event.thumb} className="w-full h-24 object-cover opacity-70 group-hover:opacity-100" alt="Event thumb" />
              <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-tighter">{event.type}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{event.time}</span>
                </div>
                <p className="text-xs text-slate-300 truncate">{event.camera}</p>
                <button className="mt-2 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] font-bold uppercase transition-colors">
                  Investigate
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="m-4 py-2 border border-slate-700 rounded-lg text-xs text-slate-400 hover:bg-slate-800 transition-colors">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default VideoCenter;
