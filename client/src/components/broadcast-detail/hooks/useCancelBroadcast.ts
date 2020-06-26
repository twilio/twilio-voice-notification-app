import useFetch from 'use-http';
import { useParams } from 'react-router';

export const useCancelBroadcast = () => {
  const { broadcastId } = useParams<{ broadcastId: string }>();

  const { patch, response, loading, error } = useFetch(
    `/api/broadcasts/${broadcastId}/cancel`
  );

  return {
    patch,
    response,
    loading,
    error,
  };
};
