import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
  TextField,
} from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    testContainer: {
      backgroundColor: theme.palette.grey[100],
      padding: '2rem',
      marginTop: '1rem',
    },
  })
);

export const WhiteTextField = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.common.white,
      },
    },
  })
)(TextField);
