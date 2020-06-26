import { TableCell, Theme } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useNumbersTableStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    border: `1px solid ${theme.palette.grey[400]}`,
  },
}));

export const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.grey[100],
  },
  body: {
    fontSize: theme.typography.body1.fontSize,
  },
}))(TableCell);

export default makeStyles({
  maxUploadView: {
    width: '100%',
  },
  shrunkUloadVoew: {
    marginLeft: '24px',
  },
});
