import React from 'react';
import { render } from '@testing-library/react';
import Example from '../Example';

describe('recipients list > Example', () => {
  test('renders the page', () => {
    const { asFragment } = render(<Example />);
    expect(asFragment()).toMatchSnapshot();
  });
});
