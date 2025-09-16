import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import { exec } from 'node:child_process';
import sudo from 'sudo-prompt';

const APP_NAME = 'Launchpad Toggle';
const PLIST = '/Library/Preferences/FeatureFlags/Domain/SpotlightUI.plist';
const DOMAIN_DIR = '/Library/Preferences/FeatureFlags/Domain';

function createWindow() {
  const win = new BrowserWindow({
    width: 460,
    height: 370,
    resizable: false,
    title: APP_NAME,
    webPreferences: {
      preload: path.join(process.cwd(), 'preload.js')
    }
  });
  win.loadFile(path.join(process.cwd(), 'renderer/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/** Helper: run a shell command (non-privileged) */
function sh(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout.toString());
    });
  });
}

/** Helper: run a shell script with admin privileges */
function shSudo(cmd) {
  const options = { name: APP_NAME, icns: undefined, // add an .icns later
    /* prompt shown by macOS is set below via "prompt" */ };
  return new Promise((resolve, reject) => {
    sudo.exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        // err.message may include "User did not grant permission."
        return reject(new Error(stderr || err.message || 'sudo failed'));
      }
      resolve(stdout?.toString?.() ?? '');
    });
  });
}

/** Detect current state */
ipcMain.handle('state:get', async () => {
  try {
    // If plist or key missing, default to "tahoe"
    const cmd = `/usr/libexec/PlistBuddy -c "Print :SpotlightPlus:Enabled" "${PLIST}"`;
    const out = await sh(cmd).catch(() => '');
    const val = out.trim().toLowerCase();
    if (val === 'false') return { state: 'classic' };
    return { state: 'tahoe' };
  } catch (e) {
    return { state: 'tahoe' };
  }
});

/** Apply Classic Launchpad */
ipcMain.handle('apply:classic', async () => {
  const script = `
set -e
BK="${PLIST}.bak-$(date +%s)"
[ -f "${PLIST}" ] && cp "${PLIST}" "$BK" || true
mkdir -p "${DOMAIN_DIR}"
/usr/bin/defaults write "${PLIST}" SpotlightPlus -dict Enabled -bool false
`;
  try {
    await shSudo(script);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
});

/** Apply Tahoe Apps (remove Launchpad override) */
ipcMain.handle('apply:tahoe', async () => {
  const script = `
set -e
BK="${PLIST}.bak-$(date +%s)"
[ -f "${PLIST}" ] && cp "${PLIST}" "$BK" || true
/bin/rm -f "${PLIST}"
`;
  try {
    await shSudo(script);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
});

/** Restart dialog + action */
ipcMain.handle('system:restart:prompt', async (evt) => {
  const win = BrowserWindow.getFocusedWindow();
  const res = await dialog.showMessageBox(win, {
    type: 'question',
    buttons: ['Restart Now', 'Later'],
    defaultId: 0,
    cancelId: 1,
    title: 'Restart Required',
    message: 'A restart is recommended to fully apply changes.'
  });
  if (res.response === 0) {
    // Ask System Events to restart (will prompt if needed)
    await sh(`osascript -e 'tell application "System Events" to restart'`).catch(()=>{});
    return { restarting: true };
  }
  return { restarting: false };
});
