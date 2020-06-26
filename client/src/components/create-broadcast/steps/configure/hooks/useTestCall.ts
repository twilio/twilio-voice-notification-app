import { useCallback, useState, useMemo } from 'react';
import isEmpty from 'lodash.isempty';
import useFetch from 'use-http';
import { CallStatus } from '@/types';
import socketIOClient from 'socket.io-client';

const wasCallSuccesful = (callStatus: CallStatus) => {
  return [
    CallStatus.COMPLETED,
    CallStatus.BUSY,
    CallStatus.NO_ANSWER,
    CallStatus.CANCELED,
  ].includes(callStatus);
};

export const useTestCall = (from: string, to: string, message: string) => {
  const [request, response] = useFetch();
  const [cancelRequest] = useFetch();
  const [callStatus, setCallStatus] = useState('initiating');
  const [isTestCallOngoing, setIsTestCallOngoing] = useState(false);
  const [callSid, setCallSid] = useState('');
  const isCancelLoading = useMemo(() => cancelRequest.loading, [cancelRequest]);
  const isCancelAvailable = useMemo(() => !isEmpty(callSid), [callSid]);

  const cancelTestCall = useCallback(async () => {
    await cancelRequest.get(`/test-call/cancel/${callSid}`);
  }, [callSid, cancelRequest]);

  const makeTestCall = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        setCallStatus('initiating');
        setIsTestCallOngoing(true);

        console.log(
          'making a test call to: %s, from: %s with the message: %s',
          to,
          from,
          message
        );

        await request.post('/test-call', {
          message,
          to,
          from,
        });

        if (!response.ok) {
          setIsTestCallOngoing(false);
          setCallStatus(CallStatus.FAILED);
          reject();
        }

        console.log('response %i', response.status);
        console.log('callSid %s', response.data?.callSid);
        setCallSid(response.data?.callSid);

        const socket = socketIOClient(window.location.origin);

        socket.on('update', (value: any) => {
          console.log('document updated: ', value);
          console.log('status: ', value.status);

          setCallStatus(value.status);

          if (wasCallSuccesful(value.status)) {
            setCallSid('');
            setIsTestCallOngoing(false);
            socket.disconnect();
            resolve(value.status);
          }

          if (value.status === CallStatus.FAILED) {
            setIsTestCallOngoing(false);
            socket.disconnect();
            reject();
          }
        });
      } catch (error) {
        console.log('second error', error);
        reject(error);
      }
    });
  }, [to, from, message, request, response.ok, response.status, response.data]);

  return {
    makeTestCall,
    cancelTestCall,
    isCancelLoading,
    isCancelAvailable,
    callStatus,
    isTestCallOngoing,
  };
};
