import React from 'react';
import { render } from '@testing-library/react';
import { PrivateRoute } from '../PrivateRoute';
import { MemoryRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

const PrivateComponent = () => <>FooBar</>;

const sessionStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('PrivateRoute', () => {
  beforeEach(window.sessionStorage.clear);
  afterAll(window.sessionStorage.clear);

  test('should redirect to login page when the user is not logged in', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Switch>
          <PrivateRoute
            component={PrivateComponent}
            exact={false}
            path="/test"
          />
          <Route render={() => <>Login</>} exact path="/login" />
        </Switch>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
          <DocumentFragment>
            Login
          </DocumentFragment>
      `);
  });

  test('should stay in the private route if the user logged in', () => {
    window.sessionStorage.setItem('passcode', '12345');

    const { asFragment } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Switch>
          <PrivateRoute
            component={PrivateComponent}
            exact={false}
            path="/test"
          />
          <Route render={() => <>Login</>} exact path="/login" />
        </Switch>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        FooBar
      </DocumentFragment>
    `);
  });
});
