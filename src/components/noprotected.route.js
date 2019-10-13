import React from "react";
import { Route, Redirect } from "react-router-dom";

export const NoProtectedRoute = ({
  refetch,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!localStorage.getItem('ui')) {
          console.log('no-autenticated')
          return <Component refetch={ refetch }/>;
        } else {
          console.log('autenticated')
          return (
            <Redirect
              to={{
                pathname: "/panel",
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
