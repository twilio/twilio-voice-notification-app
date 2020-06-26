import { INVALID_NUMBERS, VALID_NUMBERS } from './constants';

export type ValidatedNumber = {
  line: number;
  number: string;
  issue?: string | null;
};

export type ValidatedNumbers = {
  [INVALID_NUMBERS]: ValidatedNumber[];
  [VALID_NUMBERS]: ValidatedNumber[];
};
