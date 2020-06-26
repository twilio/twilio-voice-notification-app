import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BroadcastMeta, Call, CallStatus } from '@/types';
import useFetch from 'use-http';

// The app polls every X seconds to see if there are changes on call status in the Database for the corresponding voice notification.
// Please note that those status are updated via Twilio Calls callback subscription.
const TIMEOUT = 5000;

export const useRecipients = (page: number = 0, pageSize: number = 10) => {
  const { broadcastId } = useParams<{ broadcastId: string }>();
  const savedTimeoutId = useRef<any>();
  const unmounted = useRef<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [recipients, setRecipients] = useState<Call[]>([]);
  const [meta, setMeta] = useState<BroadcastMeta>({});
  const [pageCount, setPageCount] = useState<number>(0);

  const { get, response, error } = useFetch(
    `/api/broadcasts/${broadcastId}/recipients?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      data: { recipients: [], pageCount: 0, meta: {} },
    },
    [broadcastId, page, pageSize]
  );

  const fetchRecipients = useCallback(() => {
    (async () => {
      clearTimeout(savedTimeoutId.current);

      // do not make a new request after the hook is unmounted
      if (!unmounted.current) {
        setLoading(true);

        const { recipients, pageCount, meta } = await get();

        if (response.ok) {
          setRecipients(recipients);
          setPageCount(pageCount);
          setMeta(meta);
          setLoading(false);

          // keep polling until either all the calls are complete or the broadcast is canceled
          if (meta.broadcastStatus === CallStatus.IN_PROGRESS) {
            savedTimeoutId.current = setTimeout(fetchRecipients, TIMEOUT);
          }
        }
      }
    })();
  }, [
    savedTimeoutId,
    get,
    unmounted,
    setRecipients,
    setPageCount,
    setMeta,
    response,
  ]);

  useEffect(() => {
    fetchRecipients();
  }, [fetchRecipients]);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  return {
    recipients,
    meta,
    pageCount,
    loading,
    error,
  };
};
