import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import routes from "./routes";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route) => {
          const Component = route.component;
          if (route.isPrivate) {
            return (
              <PrivateRoute path={route.path} exact component={Component} />
            );
          } else {
            return <Route path={route.path} exact component={Component} />;
          }
        })}
        <Redirect from="*" to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
