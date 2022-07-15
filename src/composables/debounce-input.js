/* eslint max-params: ["error", { "max": 5 }] */
import { ref, computed, onMounted, watch } from 'vue';
import debounce from 'lodash/debounce';

/**
 * track and manage debounce input
 *
 * @param {*} initialValue - initial input value
 * @param {*} defaultValue - default input value
 * @param {HTMLInputElement} input - the input element
 * @param {EmitFn} emit - emit function from component
 * @param {useDebounceInput.isValid} isValid - function to determine if the input is valid or not
 *
 * @returns {DebounceInput}
 */
function useDebounceInput(initialValue, defaultValue, input, emit, isValid) {
  /**
   * input value
   * @type {string}
   */
  const inputValue = ref(initialValue);

  /**
   * if the input is valid or not
   * @type {boolean}
   */
  const valid = ref(isValid(initialValue));

  /**
   * classes to apply to the input
   * @type {DebounceInputClasses}
   */
  const classes = computed(() =>
    touched.value ? { 'is-valid': valid.value, 'is-invalid': !valid.value } : {}
  );

  /**
   * if the input has been touched
   * @type {boolean}
   * @private
   */
  const touched = ref(false);

  /**
   * function to be called on input after debounce
   * @param {*} value - input value
   */
  function inputChange(value) {
    if (value instanceof HTMLInputElement) {
      value = value.value;
    }

    touched.value = true;
    valid.value = isValid(value);

    emit('update:value', value);
  }

  const onInput = debounce(inputChange, 250);

  onMounted(() => {
    if (inputValue.value !== defaultValue) {
      inputChange(input.value);
    }
  });

  // watch for input value changes
  watch(inputValue, (val) => {
    onInput(val);
  });

  return {
    inputValue,
    valid,
    classes
  };
}

export default useDebounceInput;

/**
 * Return of the debounce function
 *
 * @typedef {object} DebounceInput
 *
 * @property {*} inputValue - The input value
 * @property {boolean} valid - Whether the input is valid or not
 * @property {DebounceInputClasses} classes - The classes to apply to the input
 */

/**
 * the classes to apply to the function
 *
 * @typedef {object} DebounceInputClasses
 *
 * @property {boolean} is-valid - Whether the input is valid
 * @property {boolean} is-invalid - Whether the input is invalid
 */

/**
 * function to determine if the input is valid or not
 *
 * @callback useDebounceInput.isValid
 *
 * @param {*} value - the input value
 *
 * @returns {boolean}
 */
