import Tooltip from 'bootstrap/js/dist/tooltip';

const tooltip = {
  beforeMount(el, binding) {
    el.dataset.bsToggle = 'tooltip';
    el.dataset.bsPlacement = 'bottom';

    const { arg, value } = binding;

    if (arg === 'title') {
      el.setAttribute('title', value);
    }
  },
  mounted(el) {
    Tooltip.getOrCreateInstance(el);
  },
  updated(el, binding) {
    const { arg, value, oldValue } = binding;

    if (arg === 'title' && value !== oldValue) {
      el.setAttribute('title', value);
    }
  },
  beforeUnmount(el) {
    Tooltip.getInstance(el).dispose();
  }
};
export default tooltip;
