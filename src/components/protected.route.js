import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  session,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('ui')) {
          console.log('autenticated')
          return <Component session={session}/>;
        } else {
          console.log('no-autenticated')
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
