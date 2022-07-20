const isTauri = Boolean(window.__TAURI__);

if (!isTauri) {
  console.warn('Not a tauri window');
}

export default isTauri;
