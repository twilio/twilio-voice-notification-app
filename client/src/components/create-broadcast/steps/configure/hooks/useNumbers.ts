import { useCallback, useEffect, useState } from 'react';
import useFetch from 'use-http';
import { IncomingPhoneNumberInstance } from 'twilio/lib/rest/api/v2010/account/incomingPhoneNumber';

export const useNumbers = () => {
  const [numbers, setNumbers] = useState<IncomingPhoneNumberInstance[]>([]);
  const { request } = useFetch<IncomingPhoneNumberInstance[]>();

  const loadNumbers = useCallback(() => {
    (async () => {
      const response = await request.get('/numbers');
      setNumbers(response);
    })();
  }, [setNumbers, request]);

  useEffect(() => {
    loadNumbers();
  }, [request, loadNumbers]);
  return { numbers, loadNumbers };
};
