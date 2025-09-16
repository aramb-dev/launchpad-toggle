const statusEl = document.getElementById('status');
const errorEl = document.getElementById('error');
const btnClassic = document.getElementById('btnClassic');
const btnTahoe = document.getElementById('btnTahoe');

function setStatus(state) {
  if (state === 'classic') {
    statusEl.textContent = 'Current: Classic Launchpad';
    statusEl.className = 'pill ok';
  } else {
    statusEl.textContent = 'Current: Tahoe Apps';
    statusEl.className = 'pill warn';
  }
}

function setButtonsDisabled(disabled) {
  btnClassic.disabled = disabled;
  btnTahoe.disabled = disabled;
}

async function checkCompatibility() {
  const { isCompatible, reason } = await window.api.osCheck();
  if (!isCompatible) {
    errorEl.textContent = reason;
    errorEl.style.display = 'block';
    setButtonsDisabled(true);
    statusEl.textContent = 'Unsupported OS';
    statusEl.className = 'pill';
  } else {
    refresh();
  }
}

async function refresh() {
  errorEl.style.display = 'none';
  errorEl.textContent = '';
  setButtonsDisabled(false);
  const { state } = await window.api.getState();
  setStatus(state);
}

async function apply(kind) {
  errorEl.style.display = 'none';
  errorEl.textContent = '';
  const res = kind === 'classic' ? await window.api.applyClassic() : await window.api.applyTahoe();
  if (!res.ok) {
    errorEl.textContent = res.error || 'Action failed.';
    errorEl.style.display = 'block';
    return;
  }
  await refresh();
  const r = await window.api.promptRestart();
  if (!r.restarting) {
    // no-op
  }
}

btnClassic.addEventListener('click', () => apply('classic'));
btnTahoe.addEventListener('click', () => apply('tahoe'));

checkCompatibility();
