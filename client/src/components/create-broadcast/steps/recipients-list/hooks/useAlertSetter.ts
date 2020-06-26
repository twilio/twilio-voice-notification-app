import { ValidatedNumbers } from '../types';
import { useEffect } from 'react';
import { ALERTS } from '../constants';
import { AlertDto, AlertType } from '@/components/common/alert';
import { Setter } from '@/types';

export const useAlertSetter = (
  validatedNumbers: ValidatedNumbers,
  setAlert: Setter<AlertDto>
) => {
  useEffect(() => {
    if (validatedNumbers.invalidNumbers.length > 0) {
      setAlert({
        message: ALERTS.INVALID_NUMBERS,
        type: AlertType.ERROR,
      });
    }

    if (
      validatedNumbers.invalidNumbers.length < 1 &&
      validatedNumbers.validNumbers.length > 0
    ) {
      setAlert({
        message: ALERTS.PARSE_SUCCESS,
        type: AlertType.SUCCESS,
      });
    }
  }, [validatedNumbers, setAlert]);
};
