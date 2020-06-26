import { useCallback, useEffect, useMemo, useState } from 'react';
import isEmpty from 'lodash.isempty';
import { ConfigureStep } from '@/types';
import { AlertDto } from '@/components/common/alert';

export const useConfigureState = (data: ConfigureStep) => {
  const [from, setFrom] = useState(data.number);
  const [message, setMessage] = useState(data.message);
  const [name, setName] = useState(data.name);
  const [testNumber, setTestNumber] = useState<string>('');
  const [alert, setAlert] = useState<AlertDto>({});

  useEffect(() => {
    setFrom(data.number);
    setMessage(data.message);
    setName(data.name);
  }, [data]);

  const isValid = useMemo(() => {
    return !isEmpty(name) && !isEmpty(message) && !isEmpty(from);
  }, [from, message, name]);

  const resetAlert = useCallback(() => {
    setAlert({});
  }, [setAlert]);

  return {
    alert,
    setAlert,
    resetAlert,
    isValid,
    from,
    setFrom,
    message,
    setMessage,
    name,
    setName,
    testNumber,
    setTestNumber,
  };
};
