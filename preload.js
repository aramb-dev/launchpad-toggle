import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  osCheck: () => ipcRenderer.invoke('os:check'),
  getState: () => ipcRenderer.invoke('state:get'),
  applyClassic: () => ipcRenderer.invoke('apply:classic'),
  applyTahoe: () => ipcRenderer.invoke('apply:tahoe'),
  promptRestart: () => ipcRenderer.invoke('system:restart:prompt')
});
