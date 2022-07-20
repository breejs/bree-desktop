import isTauri from '@/helpers/is-tauri';

/**
 * open a file using tauri
 *
 * @returns {function|false}
 * the function to open a file or false if tauri is not available
 */
function useTauriOpenFile() {
  if (!isTauri) {
    return false;
  }

  return (path) => {
    window.__TAURI__.shell.open(path);
  };
}

export default useTauriOpenFile;
