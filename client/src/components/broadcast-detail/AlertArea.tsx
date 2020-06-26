import React, { useMemo } from 'react';
import { Alert, AlertType } from '@/components/common/alert';
import { Box } from '@material-ui/core';

type NotificationProps = {
  showSuccess: boolean;
  recipientsError?: Error;
  hasDownloadReportFailed: boolean;
  cancelBroadcastError?: Error;
};

export const AlertArea: React.FC<NotificationProps> = ({
  showSuccess,
  recipientsError,
  hasDownloadReportFailed,
  cancelBroadcastError,
}) => {
  const alertObj = useMemo(() => {
    if (showSuccess) {
      return {
        message:
          'Your voice notification was successfuly created and messages are being sent to the list of recipients',
        type: AlertType.SUCCESS,
      };
    }
    if (recipientsError || hasDownloadReportFailed || cancelBroadcastError) {
      return {
        message:
          'Sorry, we could not retrieve your notification data this time.',
        type: AlertType.ERROR,
      };
    }
    return undefined;
  }, [
    showSuccess,
    recipientsError,
    hasDownloadReportFailed,
    cancelBroadcastError,
  ]);

  return (
    <>
      {alertObj ? (
        <Box px={3} pt={3}>
          <Alert alert={alertObj} />
        </Box>
      ) : null}
    </>
  );
};
