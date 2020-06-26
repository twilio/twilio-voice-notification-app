import React from 'react';
import { PropTypes } from '@material-ui/core';

import { StepType, ConfigureStep, RecipientsStep, ReviewStep } from '@/types';
import { ValidatedNumber } from '@/components/create-broadcast/steps/recipients-list/types';

export type StepItem = {
  key: StepType;
  label: string;
  icon: React.ReactNode;
  location: string;
  component: React.FunctionComponent<StepProps>;
  next?: string;
  prev?: string;
  nextButtonColor?: PropTypes.Color;
  nextButtonText?: string;
  nextButtonDisclaimer?: string;
};

export type StepProps = {
  data: ConfigureStep | RecipientsStep | ReviewStep;
  step: StepItem;
};

type NumbersTable = {
  headers: string[];
  rows: Array<keyof ValidatedNumber>;
};

export const VALID_NUMBERS_TABLE: NumbersTable = {
  headers: ['Line', 'Recipients Phone Number'],
  rows: ['line', 'number'],
};

export const INVALID_NUMBERS_TABLE: NumbersTable = {
  headers: ['Line', 'Number', 'Issue'],
  rows: ['line', 'number', 'issue'],
};
