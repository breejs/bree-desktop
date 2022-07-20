import { render, fireEvent, waitFor } from '@testing-library/vue';

import DebounceInput from './__mocks__/debounce-input.vue';

describe('useDebounceInput', () => {
  it('should render test component', () => {
    const { html } = render(DebounceInput);

    expect(html).not.toBe('');
  });

  it('should emit value changes', async () => {
    const { emitted, getByTestId } = render(DebounceInput);

    await fireEvent.update(getByTestId('input'), 'test');

    await waitFor(() => {
      expect(emitted('update:value')).toBeTruthy();
    });
  });

  describe('onMounted', () => {
    let component;
    let input;

    describe('when input value is not equal to default value', () => {
      beforeEach(() => {
        component = render(DebounceInput, {
          propsData: {
            value: 'test',
            defaultValue: 'default',
            isValid: () => true
          }
        });
        input = component.getByTestId('input');
      });

      it('should set classes', () => {
        expect(input.classList.contains('is-valid')).toBe(true);
        expect(input.classList.contains('is-invalid')).toBe(false);
      });
    });

    describe('when input value is equal to default value', () => {
      beforeEach(() => {
        component = render(DebounceInput, {
          propsData: {
            value: 'default',
            defaultValue: 'default',
            isValid: () => true
          }
        });
        input = component.getByTestId('input');
      });

      it('should not set classes', () => {
        expect(input.classList.contains('is-valid')).toBe(false);
        expect(input.classList.contains('is-invalid')).toBe(false);
      });
    });
  });

  describe('when user changes input', () => {
    let component;
    let input;

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe('from invalid value', () => {
      beforeEach(async () => {
        component = render(DebounceInput, {
          propsData: {
            value: 'invalid',
            defaultValue: 'default',
            isValid(value) {
              return value === 'valid';
            }
          }
        });
        input = component.getByTestId('input');

        await waitFor(() => {
          expect(input.classList.contains('is-valid')).toBe(false);
          expect(input.classList.contains('is-invalid')).toBe(true);
        });
      });

      describe('to valid value', () => {
        it('should set classes', async () => {
          await fireEvent.update(input, 'valid');
          vi.advanceTimersByTime(300);

          await waitFor(() => {
            expect(input.classList.contains('is-valid')).toBe(true);
            expect(input.classList.contains('is-invalid')).toBe(false);
          });
        });
      });

      describe('to invalid value', () => {
        it('should set classes', async () => {
          await fireEvent.update(input, 'invalid');
          vi.advanceTimersByTime(300);

          await waitFor(() => {
            expect(input.classList.contains('is-valid')).toBe(false);
            expect(input.classList.contains('is-invalid')).toBe(true);
          });
        });
      });
    });

    describe('from valid value', () => {
      beforeEach(async () => {
        component = render(DebounceInput, {
          propsData: {
            value: 'valid',
            defaultValue: 'default',
            isValid(value) {
              return value === 'valid';
            }
          }
        });
        input = component.getByTestId('input');

        await waitFor(() => {
          expect(input.classList.contains('is-valid')).toBe(true);
          expect(input.classList.contains('is-invalid')).toBe(false);
        });
      });

      describe('to valid value', () => {
        it('should not set classes', async () => {
          await fireEvent.update(input, 'valid');
          vi.advanceTimersByTime(300);

          await waitFor(() => {
            expect(input.classList.contains('is-valid')).toBe(true);
            expect(input.classList.contains('is-invalid')).toBe(false);
          });
        });
      });

      describe('to invalid value', () => {
        it('should set classes', async () => {
          await fireEvent.update(input, 'invalid');
          vi.advanceTimersByTime(300);

          await waitFor(() => {
            expect(input.classList.contains('is-valid')).toBe(false);
            expect(input.classList.contains('is-invalid')).toBe(true);
          });
        });
      });
    });

    describe('from default value', () => {
      beforeEach(async () => {
        component = render(DebounceInput, {
          propsData: {
            value: 'default',
            defaultValue: 'default',
            isValid(value) {
              return value === 'valid';
            }
          }
        });
        input = component.getByTestId('input');

        await waitFor(() => {
          expect(input.classList.contains('is-valid')).toBe(false);
          expect(input.classList.contains('is-invalid')).toBe(false);
        });
      });

      describe('to valid value', () => {
        it('should set classes', async () => {
          await fireEvent.update(input, 'valid');
          vi.advanceTimersByTime(300);

          await waitFor(() => {
            expect(input.classList.contains('is-valid')).toBe(true);
            expect(input.classList.contains('is-invalid')).toBe(false);
          });
        });
      });

      describe('to invalid value', () => {
        it('should set classes', async () => {
          await fireEvent.update(input, 'invalid');
          vi.advanceTimersByTime(300);

          await waitFor(() => {
            expect(input.classList.contains('is-valid')).toBe(false);
            expect(input.classList.contains('is-invalid')).toBe(true);
          });
        });
      });
    });
  });
});
