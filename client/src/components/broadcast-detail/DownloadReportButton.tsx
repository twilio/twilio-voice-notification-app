import React, { useCallback } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

import { Broadcast, Call, Count } from '@/types';
import { useAllRecipients } from './hooks/useAllRecipients';

type DownloadReportButtonProps = {
  broadcast: Broadcast;
  meta?: Count;
  setHasFailed: (error: boolean) => void;
};

export const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({
  broadcast,
  meta,
  setHasFailed,
}) => {
  const {
    get: getAllRecipients,
    loading,
    error,
    response,
  } = useAllRecipients();

  const onClickDownloadReport = useCallback(async () => {
    setHasFailed(false);
    const { recipients } = await getAllRecipients();

    if (response.ok) {
      const data = {
        id: broadcast.broadcastId,
        name: broadcast.friendlyName,
        message: broadcast.message,
        from: broadcast.from,
        canceled: broadcast.canceled,
        dateCreated: broadcast.dateCreated,
        dateEnd: broadcast.endDate,
        totalRecipients: recipients.length,
        summary: {
          callQueued: meta?.queued,
          callRinging: meta?.ringing,
          callInProgress: meta?.canceled,
          callCanceled: meta?.canceled,
          callCompleted: meta?.completed,
          callFailed: meta?.failed,
          callBusy: meta?.busy,
          callNoAnswer: meta?.['no-answer'],
        },
        recipients: recipients.map((recipient: Call) => ({
          callSid: recipient.callSid,
          number: recipient.to,
          status: recipient.status,
        })),
      };

      const fileName = `notification_report_${broadcast.broadcastId}`;
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = href;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (error) {
      setHasFailed(true);
    }
  }, [
    setHasFailed,
    getAllRecipients,
    response.ok,
    error,
    broadcast.broadcastId,
    broadcast.friendlyName,
    broadcast.message,
    broadcast.from,
    broadcast.canceled,
    broadcast.dateCreated,
    broadcast.endDate,
    meta,
  ]);

  return (
    <Button variant="contained" color="primary" onClick={onClickDownloadReport}>
      Download Report
      {loading && (
        <CircularProgress
          color="secondary"
          size={16}
          style={{ marginLeft: '8px' }}
        />
      )}
    </Button>
  );
};
