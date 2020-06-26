import { renderHook, cleanup } from '@testing-library/react-hooks';
import { useNumbersValidator } from '../hooks/useNumbersValidator';

let parsedNumbers: string[];
const setAlert = jest.fn();
const setValidatedNumbers = jest.fn();

describe('recipients list > useNumbersValidator', () => {
  beforeEach(() => jest.resetAllMocks());
  afterEach(() => cleanup());

  test('initializes correctly', () => {
    renderHook(() =>
      useNumbersValidator(parsedNumbers, setAlert, setValidatedNumbers)
    );

    expect(setValidatedNumbers).toHaveBeenCalledWith({
      invalidNumbers: [],
      validNumbers: [],
    });
  });

  test('valid numbers only', () => {
    parsedNumbers = ['+12025555555', '+12025555556'];

    renderHook(() =>
      useNumbersValidator(parsedNumbers, setAlert, setValidatedNumbers)
    );

    expect(setValidatedNumbers).toHaveBeenCalledWith({
      validNumbers: [
        { line: 1, number: '+12025555555', issue: null },
        { line: 2, number: '+12025555556', issue: null },
      ],
      invalidNumbers: [],
    });
  });

  test('valid and invalid numbers', () => {
    parsedNumbers = ['+12025555555', '+12025555555', '+1202555555a'];

    renderHook(() =>
      useNumbersValidator(parsedNumbers, setAlert, setValidatedNumbers)
    );

    expect(setValidatedNumbers).toHaveBeenCalledWith({
      validNumbers: [{ line: 1, number: '+12025555555', issue: null }],
      invalidNumbers: [
        { line: 2, number: '+12025555555', issue: 'Duplicate Number' },
        { line: 3, number: '+1202555555a', issue: 'Invalid Number' },
      ],
    });
  });

  test('invalid numbers only', () => {
    parsedNumbers = ['+1202555555a', '+1202555555b'];

    renderHook(() =>
      useNumbersValidator(parsedNumbers, setAlert, setValidatedNumbers)
    );

    expect(setValidatedNumbers).toHaveBeenCalledWith({
      validNumbers: [],
      invalidNumbers: [
        { line: 1, number: '+1202555555a', issue: 'Invalid Number' },
        { line: 2, number: '+1202555555b', issue: 'Invalid Number' },
      ],
    });
  });
});
