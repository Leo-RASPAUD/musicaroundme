import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from 'components/Home/Home.container';
import routes from 'utils/routes';

const Router = () => (
    <Switch>
        <Route exact path={routes.home} component={Home} />
        <Redirect to={routes.home} />
    </Switch>
);

export default Router;
