import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green, grey, orange } from '@material-ui/core/colors';
import { CallStatus } from '@/types';

type Possiblestatus =
  | CallStatus.COMPLETED
  | CallStatus.IN_PROGRESS
  | CallStatus.CANCELED;

const colors: { [key in Possiblestatus]: string } = {
  [CallStatus.CANCELED]: orange[700],
  [CallStatus.IN_PROGRESS]: grey[700],
  [CallStatus.COMPLETED]: green[700],
};

export const notificationItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      marginTop: '16px',
      backgroundColor: theme.palette.grey[50],
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: theme.palette.grey[100],
      },
    },
    notificationStatus: (props: { status: Possiblestatus }) => ({
      color: colors[props.status],
      fontWeight: 'bold',
      textTransform: 'capitalize',
    }),
  })
);

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      width: '90%',
      margin: '0 auto',
      padding: '2rem',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
    },
    subtitle: {
      margin: '32px 0',
    },
    requirements: {
      paddingInlineStart: '2rem',
    },
    createButton: {
      marginTop: '5px',
    },
  })
);
