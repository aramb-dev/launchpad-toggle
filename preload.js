import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getState: () => ipcRenderer.invoke('state:get'),
  applyClassic: () => ipcRenderer.invoke('apply:classic'),
  applyTahoe: () => ipcRenderer.invoke('apply:tahoe'),
  promptRestart: () => ipcRenderer.invoke('system:restart:prompt')
});
