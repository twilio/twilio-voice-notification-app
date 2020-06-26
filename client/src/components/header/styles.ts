import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      padding: '1rem',
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  })
);
