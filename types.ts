
export enum ServerStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE',
  ERROR = 'ERROR'
}

export interface SystemStats {
  cpu: number;
  memory: number;
  network: number;
  storage: number;
}

export interface ServiceState {
  name: string;
  status: 'Running' | 'Stopped' | 'Disabled';
  description: string;
}

export interface EvidenceItem {
  id: string;
  timestamp: string;
  type: 'Video' | 'Image' | 'Log';
  camera: string;
  severity: 'Low' | 'Medium' | 'High';
  status: 'Raw' | 'Analyzed' | 'Archived';
  path: string;
}

export interface FirewallRule {
  displayName: string;
  port: string;
  protocol: string;
  action: 'Allow' | 'Block';
}
