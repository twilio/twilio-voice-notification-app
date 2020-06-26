import { CachePolicies } from 'use-http';
import { Provider as UseHttpProvider } from 'use-http';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';

export const HttpProvider: FunctionComponent<any> = ({ children }) => {
  const history = useHistory();

  const httpOptions = {
    cachePolicy: CachePolicies.NO_CACHE,
    interceptors: {
      request: async (
        options: any,
        url: string,
        path: string,
        route: string
      ) => {
        if (route !== 'login') {
          options.headers['x-twilio-notification-key'] = sessionStorage.getItem(
            'passcode'
          );
          return options;
        }
        return options;
      },
      response: async (res: any) => {
        if (res.status === 403) {
          history.push('/login');
        }
        return res;
      },
    },
  };

  return (
    <UseHttpProvider url="/api" options={httpOptions}>
      {children}
    </UseHttpProvider>
  );
};
