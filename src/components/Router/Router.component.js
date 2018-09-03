import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from 'containers/Home.container';
import routes from 'utils/routes';

const Router = () => (
    <Switch>
        <Route exact path={routes.home} component={Home} />
        <Redirect to={routes.home} />
    </Switch>
);

export default Router;
