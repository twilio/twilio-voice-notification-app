import { Box, styled } from '@material-ui/core';

export const GreyContainer = styled(Box)((props) => ({
  backgroundColor: props.theme.palette.grey[100],
  padding: 4,
  marginTop: 4,
}));
