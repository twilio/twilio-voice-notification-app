export const MAX_NUMBERS = 500;

export const ALERTS = {
  FILE_READ_ERROR: 'There was an error reading the file.',
  FILE_EXCEEDS_MAX: `File has more than ${MAX_NUMBERS} numbers. Please review issues and upload again.`,
  INVALID_NUMBERS:
    'The list of recipients has invalid numbers. Please review issues and upload again.',
  PARSE_SUCCESS: 'The list of recipients is successfully loaded.',
  FILE_REJECT_ERROR: 'Please make sure you tried to upload a text file (.txt)',
};

export const INVALID_NUMBERS = 'invalidNumbers';
export const VALID_NUMBERS = 'validNumbers';

export const INITIAL_VALIDATION_RESULT = {
  [INVALID_NUMBERS]: [],
  [VALID_NUMBERS]: [],
};
