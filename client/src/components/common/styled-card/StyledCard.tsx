import { styled } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

export const StyledCard = styled(Card)((props) => ({
  backgroundColor: props.theme.palette.background.paper,
}));
