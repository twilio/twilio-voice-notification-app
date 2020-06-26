import { useEffect } from 'react';
import { AlertDto, AlertType } from '@/components/common/alert';
import { isValidNumber } from 'libphonenumber-js';
import { Setter } from '@/types';

import {
  ALERTS,
  INITIAL_VALIDATION_RESULT,
  INVALID_NUMBERS,
  MAX_NUMBERS,
  VALID_NUMBERS,
} from '../constants';

const getValidationResult = (parsedNumbers: string[] = []) => {
  if (parsedNumbers.length < 1) {
    return INITIAL_VALIDATION_RESULT;
  }

  const uniqueNumbers = new Set();

  return parsedNumbers.reduce(
    (acc: any, number, idx) => {
      let isDuplicate = uniqueNumbers.has(number);

      if (!isDuplicate) {
        uniqueNumbers.add(number);
      }

      const issue = isDuplicate
        ? 'Duplicate Number'
        : isValidNumber(number)
        ? null
        : 'Invalid Number';

      const item = {
        line: idx + 1,
        number,
        issue,
      };
      const keyToUpdate = issue ? INVALID_NUMBERS : VALID_NUMBERS;

      return {
        ...acc,
        [keyToUpdate]: [...acc[keyToUpdate], item],
      };
    },
    {
      [INVALID_NUMBERS]: [],
      [VALID_NUMBERS]: [],
    }
  );
};

export const useNumbersValidator = (
  parsedNumbers: string[],
  setAlert: Setter<AlertDto>,
  setValidatedNumbers: Setter<any>
) => {
  useEffect(() => {
    if (parsedNumbers?.length > MAX_NUMBERS) {
      setAlert({
        message: ALERTS.FILE_EXCEEDS_MAX,
        type: AlertType.ERROR,
      });

      return;
    }

    setValidatedNumbers(getValidationResult(parsedNumbers));
  }, [parsedNumbers, setValidatedNumbers, setAlert]);
};
