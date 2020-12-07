import React from 'react';
import { useAuth } from '../hooks/auth';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
 } from 'react-router-dom';

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  console.log(user, isPrivate);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{
            pathname: isPrivate ? '/' : 'dashboard',
            state: { from: location }
          }} />
        )
      }}
    />
  )
};

export default Route;