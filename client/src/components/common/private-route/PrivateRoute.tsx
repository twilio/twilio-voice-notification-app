import React, { useMemo } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  component: React.ComponentType<any>;
  exact: boolean;
  path: string;
};

export const PrivateRoute = ({
  component: CustomComponent,
  ...props
}: PrivateRouteProps) => {
  const location = useLocation();

  const isAuthenticated = useMemo(() => sessionStorage.getItem('passcode'), []);

  return (
    <Route
      {...props}
      render={(otherProps) =>
        isAuthenticated ? (
          <CustomComponent {...otherProps} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};
