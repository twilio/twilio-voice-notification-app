import { useEffect } from 'react';
import { ALERTS } from '../constants';
import { AlertType, AlertDto } from '@/components/common/alert';
import { Setter } from '@/types';

export const useFileReader = (
  selectedFile: File | null,
  setAlert: Setter<AlertDto>,
  setParsedNumbers: Setter<string[]>
) => {
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onabort = () => {
        setAlert({
          message: ALERTS.FILE_READ_ERROR,
          type: AlertType.ERROR,
        });
      };

      reader.onerror = () => {
        setAlert({
          message: ALERTS.FILE_READ_ERROR,
          type: AlertType.ERROR,
        });
      };

      reader.onload = () => {
        const binaryStr: any = reader.result || '';
        const parsedString = binaryStr.replace(/\n$/, '').split(/\n/);

        setParsedNumbers(parsedString);
      };

      reader.readAsText(selectedFile!);
    }
  }, [selectedFile, setAlert, setParsedNumbers]);
};
