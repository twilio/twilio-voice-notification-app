import { renderHook, cleanup } from '@testing-library/react-hooks';

import { useRecipientsList } from '../hooks';
import { UseRecipientListProps } from '@/components/create-broadcast/steps/recipients-list/hooks/useRecipientsList';

const getNewFileForNumbers = (numbers: string[]) =>
  new File(
    numbers.map((number) => `${number}\n`),
    'test.txt'
  );

let props: UseRecipientListProps;

describe('recipients list > useRecipientsList', () => {
  beforeEach(() => {
    props = {
      savedNumbers: [],
      savedSelectedFile: null,
    };
  });

  afterEach(() => cleanup());

  test('a file with valid and invalid numbers', async () => {
    props.savedSelectedFile = getNewFileForNumbers([
      '+12025555555',
      '+1234',
      '+12025555555',
    ]);

    let { result, waitForNextUpdate } = renderHook(() =>
      useRecipientsList(props)
    );

    await waitForNextUpdate();

    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "alert": Object {
          "message": "The list of recipients has invalid numbers. Please review issues and upload again.",
          "type": "error",
        },
        "getInputProps": [Function],
        "getRootProps": [Function],
        "invalidNumbers": Array [
          Object {
            "issue": "Invalid Number",
            "line": 2,
            "number": "+1234",
          },
          Object {
            "issue": "Duplicate Number",
            "line": 3,
            "number": "+12025555555",
          },
        ],
        "selectedFile": File {},
        "validNumbers": Array [
          Object {
            "issue": null,
            "line": 1,
            "number": "+12025555555",
          },
        ],
      }
    `);
  });

  test('a file with valid numnbers only', async () => {
    props.savedSelectedFile = getNewFileForNumbers([
      '+12025555555',
      '+12025555556',
    ]);

    let { result, waitForNextUpdate } = renderHook(() =>
      useRecipientsList(props)
    );

    await waitForNextUpdate();

    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "alert": Object {
          "message": "The list of recipients is successfully loaded.",
          "type": "success",
        },
        "getInputProps": [Function],
        "getRootProps": [Function],
        "invalidNumbers": Array [],
        "selectedFile": File {},
        "validNumbers": Array [
          Object {
            "issue": null,
            "line": 1,
            "number": "+12025555555",
          },
          Object {
            "issue": null,
            "line": 2,
            "number": "+12025555556",
          },
        ],
      }
    `);
  });

  test('a file with invalid numbers only', async () => {
    props.savedSelectedFile = getNewFileForNumbers(['+1202555555a', '+123']);

    let { result, waitForNextUpdate } = renderHook(() =>
      useRecipientsList(props)
    );

    await waitForNextUpdate();

    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "alert": Object {
          "message": "The list of recipients has invalid numbers. Please review issues and upload again.",
          "type": "error",
        },
        "getInputProps": [Function],
        "getRootProps": [Function],
        "invalidNumbers": Array [
          Object {
            "issue": "Invalid Number",
            "line": 1,
            "number": "+1202555555a",
          },
          Object {
            "issue": "Invalid Number",
            "line": 2,
            "number": "+123",
          },
        ],
        "selectedFile": File {},
        "validNumbers": Array [],
      }
    `);
  });

  test('a file with more than 4000 recipients', async () => {
    props.savedSelectedFile = getNewFileForNumbers(
      [...Array(4001).keys()].map((i) => `${i}`)
    );

    let { result, waitForNextUpdate } = renderHook(() =>
      useRecipientsList(props)
    );

    await waitForNextUpdate();

    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "alert": Object {
          "message": "File has more than 500 numbers. Please review issues and upload again.",
          "type": "error",
        },
        "getInputProps": [Function],
        "getRootProps": [Function],
        "invalidNumbers": Array [],
        "selectedFile": File {},
        "validNumbers": Array [],
      }
    `);
  });
});
