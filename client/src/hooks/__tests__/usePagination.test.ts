import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { usePagination } from '../usePagination';

const numbers = [...Array(30).keys()];

let data: number[];

describe('usePagination', () => {
  beforeEach(() => {
    data = numbers;
  });

  afterEach(() => {
    cleanup();
  });

  test('empty array', () => {
    let { result } = renderHook(() => usePagination(data));
    expect(result).toMatchSnapshot();
  });

  test('handleChangePage', () => {
    let { result } = renderHook(() => usePagination(data));

    act(() => {
      result.current.handleChangePage(null, 2);
    });

    expect(result.current).toMatchSnapshot();
  });

  test('handleChangeRowsPerPage', () => {
    let { result } = renderHook(() => usePagination(data));

    act(() => {
      result.current.handleChangeRowsPerPage({ target: { value: 25 } });
    });

    expect(result.current).toMatchSnapshot();
  });
});
