
import React from 'react';
import { Icons, SERVER_IDENTITY } from '../constants';

const ServerConfig: React.FC = () => {
  const settings = [
    { title: 'Computer Name', value: SERVER_IDENTITY.hostname, type: 'System' },
    { title: 'Time Zone', value: SERVER_IDENTITY.location, type: 'Region' },
    { title: 'Service User', value: SERVER_IDENTITY.serviceAccount, type: 'Security' },
    { title: 'TCP Tuning', value: 'CTCP / Autotuning Normal', type: 'Network' },
  ];

  const services = [
    { name: 'ScrapShield Core', status: 'Running', health: 'Healthy' },
    { name: 'Gemini Analysis Engine', status: 'Running', health: 'Healthy' },
    { name: 'RTSP Ingestion Gateway', status: 'Running', health: 'Warning' },
    { name: 'PS-Remoting (Secure)', status: 'Enabled', health: 'Healthy' },
  ];

  const firewall = [
    { name: 'ScrapShield RTSP In', port: '554', proto: 'TCP', action: 'Allow' },
    { name: 'ScrapShield Web UI (HTTP)', port: '80', proto: 'TCP', action: 'Allow' },
    { name: 'ScrapShield Web UI (HTTPS)', port: '443', proto: 'TCP', action: 'Allow' },
    { name: 'Global Inbound', port: 'Any', proto: 'Any', action: 'Block' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <Icons.Settings />
            <h3 className="font-bold">Core Configuration</h3>
          </div>
          <div className="p-6 space-y-4">
            {settings.map((s, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-slate-800 last:border-0">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-mono">{s.type}</p>
                  <p className="text-sm font-semibold text-slate-200">{s.title}</p>
                </div>
                <div className="px-3 py-1 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-cyan-400">
                  {s.value}
                </div>
              </div>
            ))}
            <button className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
              <Icons.Shield /> Re-run Hardening Script
            </button>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <Icons.Activity />
            <h3 className="font-bold">Hardened Services</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {services.map((svc, i) => (
                <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between group hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${svc.status === 'Running' ? 'bg-green-500' : 'bg-amber-500'}`} />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{svc.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">STATUS: {svc.status}</p>
                    </div>
                  </div>
                  <div className={`text-[10px] font-bold px-2 py-1 rounded ${svc.health === 'Healthy' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {svc.health.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-950/20 border border-red-900/30 rounded-lg">
              <p className="text-xs text-red-400 flex items-center gap-2">
                <Icons.AlertTriangle /> Warning: Telemetry & Fax services disabled per policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Firewall Rules */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <Icons.Shield />
          <h3 className="font-bold">NetFirewall Policy</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] text-slate-500 font-mono uppercase text-left">
                  <th className="pb-4">Rule Name</th>
                  <th className="pb-4">Port</th>
                  <th className="pb-4">Protocol</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {firewall.map((rule, i) => (
                  <tr key={i}>
                    <td className="py-3 text-sm font-semibold text-slate-200">{rule.name}</td>
                    <td className="py-3 text-xs font-mono text-slate-400">{rule.port}</td>
                    <td className="py-3 text-xs font-mono text-slate-400">{rule.proto}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${rule.action === 'Allow' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {rule.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerConfig;
