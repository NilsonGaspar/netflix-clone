import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ user, children }) {
  return (
    <Route
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "signin",
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function RedirectUser({ user, loggedInPath, children }) {
  return (
    <Route
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
