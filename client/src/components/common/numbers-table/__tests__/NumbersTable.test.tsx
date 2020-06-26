import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { NumbersTable, NumbersTableProps } from '../NumbersTable';

const props: NumbersTableProps = {
  headers: ['Line', 'Numbers', 'Issue'],
  rows: ['line', 'number', 'issue'],
  data: [
    {
      line: 1,
      number: '+14081234567',
      issue: null,
    },
    {
      line: 2,
      number: '+14081234567',
      issue: 'Duplicate Number',
    },
    {
      line: 3,
      number: 'asasd',
      issue: 'Invalid Number',
    },
  ],
};

describe('NumbersTable', () => {
  test('renders the page', () => {
    const { asFragment } = render(
      <Router>
        <NumbersTable {...props} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
