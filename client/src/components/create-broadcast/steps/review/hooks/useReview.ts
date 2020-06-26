import { useCallback } from 'react';
import { completeReviewStep, Steps, stepsSelector } from '@/redux';
import useFetch from 'use-http/dist';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ConfigureStep, RecipientsStep } from '@/types';

type useReviewResult = {
  onComplete: () => void;
  loading: boolean;
  error?: Error;
  numbers: string[];
  number: string;
  message: string;
  name: string;
};

export const useReview = (): useReviewResult => {
  const steps: Steps = useSelector(stepsSelector);

  const { configure, recipients } = steps;
  const { message, name, number } = configure as ConfigureStep;
  const { numbers } = recipients as RecipientsStep;

  const dispatch = useDispatch();
  const history = useHistory();
  const { post, response, loading, error } = useFetch();

  const onComplete = useCallback(() => {
    (async () => {
      const { broadcastId } = await post('/broadcasts', {
        friendlyName: name,
        message,
        from: number,
        to: numbers.join(','),
      });

      if (response.ok) {
        dispatch(completeReviewStep({ broadcastId, completed: true }));
        history.push(`/broadcasts/${broadcastId}?success=true`);
      }
    })();
  }, [post, response, history, dispatch, message, name, number, numbers]);

  return { onComplete, loading, error, numbers, number, message, name };
};
