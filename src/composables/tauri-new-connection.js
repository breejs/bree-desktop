import { ref, computed } from 'vue';

import { useBreeStore } from '@/stores/bree';
import isTauri from '@/helpers/is-tauri';

/**
 * handle add new connection event from tauri
 *
 * @returns {Object} return
 * @returns {boolean} return.showConnectionForm - show connection form
 * @returns {stirng[]} return.connectionNames - connection names
 * @returns {function} return.onConnectionAdded - on connection added
 * @returns {function} return.onHidden - on modal being hidden
 */
function useTauriNewConnection() {
  if (!isTauri) {
    return {
      showConnectionForm: false
    };
  }

  const { appWindow } = window.__TAURI__.window;

  // load in breeStore
  const breeStore = useBreeStore();

  /** @type {boolean} */
  const showConnectionForm = ref(false);
  /** @type {string[]} */
  const connectionNames = computed(() =>
    breeStore.connections.map(({ name }) => name)
  );

  // listen to new connection event
  appWindow.listen('show-new-connection', () => {
    showConnectionForm.value = true;
  });

  // handle connection added event
  function onConnectionAdded(event) {
    console.log('fired');
    breeStore.addConnection(event);
    showConnectionForm.value = false;
  }

  // handle modal hidden event
  function onModalHidden() {
    showConnectionForm.value = false;
  }

  return {
    showConnectionForm,
    connectionNames,
    onConnectionAdded,
    onModalHidden
  };
}

export default useTauriNewConnection;
