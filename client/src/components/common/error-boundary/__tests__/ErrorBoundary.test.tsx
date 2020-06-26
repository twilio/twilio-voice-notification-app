import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { ErrorBoundary } from '../ErrorBoundary';

const ErrorComponent: React.FC<{ throwsError?: boolean }> = ({
  throwsError = false,
}) => {
  if (throwsError) {
    throw new Error('ErrorComponent');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  test('shows children', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
  test('shows message when it catches an error', async () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const { container } = render(
      <ErrorBoundary>
        <ErrorComponent throwsError />
      </ErrorBoundary>
    );
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });

    spy.mockRestore();
  });
});
