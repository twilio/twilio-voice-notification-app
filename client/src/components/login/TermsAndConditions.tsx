import React from 'react';
import { Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const TermsAndConditions: React.FC = () => (
  <Alert severity="info">
    <strong>Reminder </strong>- Please note you have agreed to the{' '}
    <Link href="https://www.twilio.com/legal/tos">
      Twilio Terms and Service
    </Link>{' '}
    and{' '}
    <Link href="https://www.twilio.com/legal/aup">
      Twilio Acceptable Use Policy
    </Link>
    , as incorporated therein.
  </Alert>
);

export default TermsAndConditions;
