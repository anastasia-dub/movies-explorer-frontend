import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({
  component: Component,
  loggedIn,
  redirectTo = '/signin',
  ...props
}) {
  return (
    <Route>
      {loggedIn ? (
        <Component
          {...props}
        />) : (
        <Redirect
          to={redirectTo}/>)
      }
    </Route>
  );
}

export default ProtectedRoute;
