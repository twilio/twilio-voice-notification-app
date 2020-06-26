import useFetch from 'use-http';
import { useParams } from 'react-router-dom';

export const useAllRecipients = () => {
  const { broadcastId } = useParams<{ broadcastId: string }>();

  const { get, response, loading, error } = useFetch(
    `/api/broadcasts/${broadcastId}/all-recipients`,
    {
      method: 'GET',
      data: { recipients: [] },
    },
    [broadcastId]
  );

  return {
    get,
    response,
    loading,
    error,
  };
};
