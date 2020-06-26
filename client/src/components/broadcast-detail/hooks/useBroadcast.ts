import useFetch from 'use-http';
import { useParams } from 'react-router';
import { defaultBroadcast } from '../constants';

export const useBroadcast = () => {
  const { broadcastId } = useParams<{ broadcastId: string }>();

  const { data, loading, error, get } = useFetch(
    `/api/broadcasts/${broadcastId}`,
    {
      method: 'GET',
      data: { broadcast: defaultBroadcast },
    },
    [broadcastId]
  );

  return {
    data,
    loading,
    error,
    get,
  };
};
