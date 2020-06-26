import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useFileReader } from '../hooks';

const setAlert = jest.fn();
const setParsedNumbers = jest.fn();
const selectedFile = new File(
  ['+12025555555\n', '+12025555556\n', '+12025555557\n', '+12025555558\n'],
  'test.txt'
);

describe('recipients list > useFileReader', () => {
  afterEach(() => cleanup());

  test('set parsed numbers correctly', async () => {
    await act(async () => {
      let { waitForNextUpdate } = renderHook(() =>
        useFileReader(selectedFile, setAlert, setParsedNumbers)
      );

      await waitForNextUpdate();

      await new Promise((r) => setTimeout(r, 200));

      expect(setParsedNumbers).toHaveBeenCalledWith([
        '+12025555555',
        '+12025555556',
        '+12025555557',
        '+12025555558',
      ]);
    });
  });
});
