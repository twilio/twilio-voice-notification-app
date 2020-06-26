import React from 'react';

import { StepItem } from './types';
import { StepType } from '@/types';

import { Configure, RecipientList, Review } from './steps';

import {
  Settings as SettingsIcon,
  GroupAdd as GroupAddIcon,
  Send as SendIcon,
} from '@material-ui/icons';

const locations = {
  configure: '/create/configure',
  recipients: '/create/recipients',
  review: '/create/review',
};

export const steps: Array<StepItem> = [
  {
    key: StepType.Configure,
    label: 'Configure Broadcast',
    icon: <SettingsIcon />,
    location: locations.configure,
    component: Configure,
    next: locations.recipients,
  },
  {
    key: StepType.Recipients,
    label: 'Upload Recipients',
    icon: <GroupAddIcon />,
    location: locations.recipients,
    component: RecipientList,
    prev: locations.configure,
    next: locations.review,
  },
  {
    key: StepType.Review,
    label: 'Review & Send',
    icon: <SendIcon />,
    location: locations.review,
    component: Review,
    prev: locations.recipients,
    next: '',
  },
];
