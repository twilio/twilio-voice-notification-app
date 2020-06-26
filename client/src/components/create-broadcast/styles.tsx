import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  StepConnector,
  StepLabel,
  styled,
  Theme,
  withStyles,
} from '@material-ui/core';

import { Check } from '@material-ui/icons';

interface WizardIconStyleProps {
  active?: boolean;
  completed?: boolean;
  prevStepCompleted?: boolean;
}

interface WizardIconProps extends WizardIconStyleProps {
  icon: React.ReactNode;
}

const useIconStyles = makeStyles((theme) =>
  createStyles({
    step: ({ active, completed }: WizardIconStyleProps) => {
      const mainColor = theme.palette.primary.dark;
      const greyColor = theme.palette.grey[400];
      const color = active || completed ? mainColor : greyColor;
      return {
        color: theme.palette.common.white,
        padding: '10px',
        borderRadius: '30px',
        background: color,
      };
    },
  })
);

export const WizardStepIcon = ({
  icon,
  active,
  completed,
}: WizardIconProps) => {
  const classes = useIconStyles({ active, completed });
  return (
    <div className={classes.step}>
      {completed && !active ? <Check /> : icon}
    </div>
  );
};

export const CustomConnector = withStyles((theme: Theme) => ({
  alternativeLabel: {
    top: 22,
    left: 'calc(-50% + 23px);',
  },
  active: {
    '& $line': {
      borderColor: theme.palette.primary.dark,
    },
  },
  completed: {
    '& $line': {
      borderColor: theme.palette.primary.dark,
    },
  },
  line: {
    borderColor: theme.palette.grey[300],
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

export const StyledStepLabel = styled(StepLabel)({
  '& .MuiStepLabel-completed': {
    fontWeight: 'normal',
  },
});
