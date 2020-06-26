import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { RecipientList } from '../RecipientList';
import { store } from '@/redux';
import { StepProps, steps } from '@/components/create-broadcast';

let props: StepProps = {
  step: steps[1],
  data: {
    completed: false,
    numbers: [],
    selectedFile: null,
  },
};

const fullRender = async (componentProps: StepProps) =>
  await render(
    <Provider store={store}>
      <Router>
        <RecipientList {...componentProps} />
      </Router>
    </Provider>
  );

describe('recipients list > RecipientsList', () => {
  test('renders the page', async () => {
    const { asFragment } = await fullRender(props);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the padge with saved file', async () => {
    await act(async () => {
      props.data = {
        completed: true,
        numbers: ['+12025555555', '+12025555556', '+12025555557'],
        selectedFile: new File(
          ['+12025555555\n', '+12025555556\n', '+12025555557\n'],
          'test.txt'
        ),
      };
      const { asFragment } = await fullRender(props);
      await new Promise((r) => setTimeout(r, 200));

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
