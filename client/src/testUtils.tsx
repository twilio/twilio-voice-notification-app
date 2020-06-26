import React, { ReactNode } from 'react';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { store } from '@/redux';
import { HttpProvider } from '@/http-provider';

const makeContextWrapper = (
  history: MemoryHistory
): React.FC<{
  children?: ReactNode;
}> => ({ children }) => (
  <Provider store={store}>
    <Router history={history}>
      <HttpProvider>{children}</HttpProvider>
    </Router>
  </Provider>
);

export const renderWithAppContexts = (
  ui: React.ReactElement,
  options?: any
) => {
  const history = createMemoryHistory();
  const Wrapper = makeContextWrapper(history);
  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    history,
  };
};
