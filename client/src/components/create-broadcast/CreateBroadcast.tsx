import React, { useEffect } from 'react';
import { useCreateBroadcastState } from './hooks';
import { Wizard } from './Wizard';
import { useDispatch } from 'react-redux';
import { discardBroadcast } from '@/redux';

export const CreateBroadcast = () => {
  const { activeStep, data } = useCreateBroadcastState();
  const dispatch = useDispatch();

  // Cleans the Wizard state everytime the Create Notification screen is loaded.
  useEffect(() => {
    dispatch(discardBroadcast());
  }, [dispatch]);

  return <Wizard activeStep={activeStep} data={data} />;
};
