import React, { useCallback, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { HomeButton } from '@/components/common/buttons';
import { DownloadReportButton } from './DownloadReportButton';
import { CancelBroadcastButton } from './CancelBroadcastButton';
import { Broadcast, BroadcastMeta, CallStatus } from '@/types';
import { FetchData, Res } from 'use-http/dist';
import { Setter } from '@/types/setter';

type BroadcastDetailNavigationProps = {
  broadcast: Broadcast;
  meta: BroadcastMeta;
  cancelBroadcast: FetchData;
  cancelBroadcastLoading: boolean;
  cancelBroadcastResponse: Res<any>;
  getBroadcast: (r?: string) => Promise<any>;
  setHasDownloadReporFailed: Setter<boolean>;
};

export const BroadcastDetailNavigation: React.FC<BroadcastDetailNavigationProps> = ({
  broadcast,
  meta,
  cancelBroadcast,
  cancelBroadcastLoading,
  cancelBroadcastResponse,
  setHasDownloadReporFailed,
  getBroadcast,
}) => {
  const finishedBroadcast = useMemo(
    () =>
      meta.broadcastStatus === CallStatus.COMPLETED ||
      meta.broadcastStatus === CallStatus.CANCELED,
    [meta.broadcastStatus]
  );

  const onClickCancelBroadcast = useCallback(async () => {
    await cancelBroadcast();
    if (cancelBroadcastResponse.ok) {
      getBroadcast();
    }
  }, [cancelBroadcast, cancelBroadcastResponse, getBroadcast]);

  return (
    <Grid container component="nav">
      <Grid item xs={6}>
        <HomeButton />
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'right' }}>
        {finishedBroadcast && (
          <DownloadReportButton
            broadcast={broadcast}
            meta={meta.count}
            setHasFailed={setHasDownloadReporFailed}
          />
        )}
        {!finishedBroadcast && (
          <CancelBroadcastButton
            onClick={onClickCancelBroadcast}
            isLoading={cancelBroadcastLoading}
          />
        )}
      </Grid>
    </Grid>
  );
};
