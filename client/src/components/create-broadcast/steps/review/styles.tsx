import { createStyles, makeStyles } from '@material-ui/core/styles';

const useReviewStyles = makeStyles(() =>
  createStyles({
    progressContainer: {
      textAlign: 'center',
    },
    recipientsTableBody: {
      maxHeight: `${33 * 6}px`,
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    itIsBlock: {
      display: 'block',
    },
    cardReview: {
      padding: '1rem 2rem 2rem 2rem',
      margin: '1rem 0',
    },
  })
);

export default useReviewStyles;
