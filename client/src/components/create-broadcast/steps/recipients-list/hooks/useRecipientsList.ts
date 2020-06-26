import { useCallback, useState, useEffect } from 'react';
import { useFileReader } from './useFileReader';
import { useNumbersValidator } from './useNumbersValidator';
import { useAlertSetter } from './useAlertSetter';
import { useCustomDropZone } from './useCustomDropZone';
import { AlertDto } from '@/components/common/alert';
import { INITIAL_VALIDATION_RESULT } from '../constants';

export type UseRecipientListProps = {
  savedNumbers: string[];
  savedSelectedFile: File | null;
};

export const useRecipientsList = ({
  savedNumbers,
  savedSelectedFile,
}: UseRecipientListProps) => {
  const [alert, setAlert] = useState<AlertDto>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedNumbers, setParsedNumbers] = useState<string[]>([]);
  const [validatedNumbers, setValidatedNumbers] = useState(
    INITIAL_VALIDATION_RESULT
  );

  useEffect(() => {
    if (savedNumbers) {
      setParsedNumbers(savedNumbers);
    }
  }, [savedNumbers]);

  useEffect(() => {
    if (savedSelectedFile) {
      setSelectedFile(savedSelectedFile);
    }
  }, [savedSelectedFile]);

  const resetAlert = useCallback(() => {
    setAlert({});
  }, [setAlert]);

  const { getRootProps, getInputProps } = useCustomDropZone(
    resetAlert,
    setParsedNumbers,
    setSelectedFile,
    setAlert
  );
  //
  useFileReader(selectedFile, setAlert, setParsedNumbers);
  useNumbersValidator(parsedNumbers, setAlert, setValidatedNumbers);
  useAlertSetter(validatedNumbers, setAlert);

  return {
    selectedFile,
    getRootProps,
    getInputProps,
    alert,
    ...validatedNumbers,
  };
};
