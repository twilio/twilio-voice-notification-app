import React from 'react';
import { render } from '@testing-library/react';
import { AlertArea } from '../AlertArea';

describe('broadcast detail > AlertArea', () => {
  it('renders nothing when there are nothing to notify', () => {
    const props = {
      showSuccess: false,
      recipientsError: undefined,
      hasDownloadReportFailed: false,
      cancelBroadcastError: undefined,
    };

    const { asFragment } = render(<AlertArea {...props} />);
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
  });

  it('shows success message', () => {
    const props = {
      showSuccess: true,
      recipientsError: undefined,
      hasDownloadReportFailed: false,
      cancelBroadcastError: undefined,
    };

    const { getByText } = render(<AlertArea {...props} />);

    expect(
      getByText(
        'Your voice notification was successfuly created and messages are being sent to the list of recipients'
      )
    ).toBeDefined();
  });

  it('shows recipients error message', () => {
    const props = {
      showSuccess: false,
      recipientsError: new Error('Something went wrong'),
      hasDownloadReportFailed: false,
      cancelBroadcastError: undefined,
    };

    const { getByText } = render(<AlertArea {...props} />);

    expect(
      getByText(
        'Sorry, we could not retrieve your notification data this time.'
      )
    ).toBeDefined();
  });

  it('shows download failed message', () => {
    const props = {
      showSuccess: false,
      recipientsError: undefined,
      hasDownloadReportFailed: true,
      cancelBroadcastError: undefined,
    };

    const { getByText } = render(<AlertArea {...props} />);

    expect(
      getByText(
        'Sorry, we could not retrieve your notification data this time.'
      )
    ).toBeDefined();
  });

  it('shows cancel broadcast error message', () => {
    const props = {
      showSuccess: false,
      recipientsError: undefined,
      hasDownloadReportFailed: false,
      cancelBroadcastError: new Error('Something went wrong'),
    };

    const { getByText } = render(<AlertArea {...props} />);

    expect(
      getByText(
        'Sorry, we could not retrieve your notification data this time.'
      )
    ).toBeDefined();
  });
});
