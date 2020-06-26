import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AlertType, AlertDto } from '@/components/common/alert';
import { ALERTS } from '../constants';
import { Setter } from '@/types';

const FILE_TYPE = 'text/plain';

export const useCustomDropZone = (
  resetAlert: Function,
  setParsedNumbers: Setter<string[]>,
  setSelectedFile: Setter<File | null>,
  setAlert: Setter<AlertDto>
) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setParsedNumbers([]);
      resetAlert();

      acceptedFiles.forEach((file: any) => {
        setSelectedFile(file);
      });
    },
    [resetAlert, setParsedNumbers, setSelectedFile]
  );

  const onDropRejected = useCallback(
    (fileRejections) => {
      const file = fileRejections[0];
      const errorMessage = `${ALERTS.FILE_READ_ERROR} ${
        file.type !== FILE_TYPE ? ALERTS.FILE_REJECT_ERROR : ''
      }`;

      setAlert({
        message: errorMessage,
        type: AlertType.ERROR,
      });
    },
    [setAlert]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: 'text/plain',
    multiple: false,
  });

  return { getRootProps, getInputProps };
};
