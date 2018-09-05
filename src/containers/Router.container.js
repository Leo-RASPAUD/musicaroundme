import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import EventsAndMap from 'components/EventsAndMap/EventsAndMap.component';
import GetCurrentInformation from 'containers/GetCurrentInformation.container';
import routes from 'utils/routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    isLocationAvailable: Object.keys(state.map.currentPosition).length > 0,
});

@withRouter
@connect(
    mapStateToProps,
    null,
)
class Router extends React.PureComponent {
    static propTypes = {
        isLocationAvailable: PropTypes.bool.isRequired,
    };

    render() {
        const { isLocationAvailable } = this.props;
        return (
            <Switch>
                <Route
                    exact
                    path={routes.getCurrentInformation}
                    component={GetCurrentInformation}
                />
                {isLocationAvailable && <Route exact path={routes.home} component={EventsAndMap} />}
                <Redirect to={routes.getCurrentInformation} />
            </Switch>
        );
    }
}

export default Router;
