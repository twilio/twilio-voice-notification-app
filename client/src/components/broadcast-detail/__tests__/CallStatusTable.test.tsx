import React from 'react';
import { render } from '@testing-library/react';
import { CallStatusTable } from '../CallStatusTable';
import { Call, CallStatus } from '@/types';

const defaultProps = {
  recipients: [] as Call[],
  meta: { total: 0 },
  loading: false,
  pageCount: 0,
  rowsPerPage: 10,
  setRowsPerPage: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn(),
};

describe('BroadcastDetail > CallStatusTable', () => {
  test('renders correctly', () => {
    const props = {
      ...defaultProps,
      recipients: [
        {
          callSid: 'CS000000',
          to: '+100001',
          status: CallStatus.IN_PROGRESS,
        },
      ],
      meta: { total: 1 },
      pageCount: 1,
      currentPage: 0,
    };

    const { asFragment } = render(<CallStatusTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders nothing when there are no recipients', () => {
    const { asFragment } = render(<CallStatusTable {...defaultProps} />);
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
  });
});
