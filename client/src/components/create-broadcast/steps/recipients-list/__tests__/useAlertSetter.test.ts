import { renderHook, cleanup } from '@testing-library/react-hooks';
import { useAlertSetter } from '../hooks';
import { ValidatedNumbers } from '../types';
import { INVALID_NUMBERS, VALID_NUMBERS } from '../constants';

const setAlert = jest.fn();
let validatedNumbers: ValidatedNumbers;

describe('recipients list > useAlertSetter', () => {
  afterEach(() => cleanup());

  test('valid numbers', () => {
    validatedNumbers = {
      [INVALID_NUMBERS]: [],
      [VALID_NUMBERS]: [
        {
          line: 1,
          number: '',
          issue: null,
        },
      ],
    };

    renderHook(() => useAlertSetter(validatedNumbers, setAlert));

    expect(setAlert).toHaveBeenCalledWith({
      message: 'The list of recipients is successfully loaded.',
      type: 'success',
    });
  });

  test('invalid numbers', () => {
    validatedNumbers = {
      [INVALID_NUMBERS]: [
        {
          line: 1,
          number: '',
          issue: null,
        },
      ],
      [VALID_NUMBERS]: [],
    };

    renderHook(() => useAlertSetter(validatedNumbers, setAlert));

    expect(setAlert).toHaveBeenCalledWith({
      message:
        'The list of recipients has invalid numbers. Please review issues and upload again.',
      type: 'error',
    });
  });
});
