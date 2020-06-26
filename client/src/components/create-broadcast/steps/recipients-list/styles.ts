import { Theme, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useUploaderStyles = makeStyles((theme: Theme) => ({
  uploader: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[400]}`,
    borderStyle: 'dashed',
  },
  uploaderItems: {
    padding: '10px',
  },
}));

export const useExampleStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: '400px',
  },
  numbersBox: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: '3px',
    padding: '10px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: theme.typography.subtitle1.fontSize,
  },
}));

export const StyledAlert = withStyles(() => ({
  root: {
    marginTop: '1.5rem',
  },
}))(Alert);

export const StyledBox = withStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.grey[200]}`,
  },
}))(Box);

export default makeStyles({
  maxUploadView: {
    width: '100%',
  },
  shrunkUloadVoew: {
    marginLeft: '24px',
  },
});
