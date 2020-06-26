import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { MainContainer } from '@/components/common/containers';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { PrivateRoute } from '@/components/common/private-route';
import { HttpProvider } from '@/http-provider';
import { store } from '@/redux';

import {
  CreateBroadcast,
  BroadcastDetail,
  BroadcastList,
  Login,
  Header,
} from '@/components';

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <CssBaseline />
      <Header />
      <MainContainer maxWidth="lg">
        <Router>
          <HttpProvider>
            <Switch>
              <PrivateRoute
                component={CreateBroadcast}
                exact={false}
                path="/create"
              />
              <PrivateRoute
                component={BroadcastList}
                exact
                path="/broadcasts"
              />
              <PrivateRoute
                component={BroadcastDetail}
                exact
                path="/broadcasts/:broadcastId"
              />
              <Route component={Login} exact path="/login" />
              <Route component={Login} exact path="/" />
            </Switch>
          </HttpProvider>
        </Router>
      </MainContainer>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
