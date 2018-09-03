import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import mapActions from 'actions/Map.actions';
import Home from 'components/Home/Home.component';

const mapStateToProps = state => ({
    currentPosition: state.map.currentPosition,
    zoom: state.map.zoom,
    gmapsApiKey: state.app.configuration.gmapsApiKey,
    upcomingEvents: state.events.upcomingEvents,
});

const mapDispatchToProps = dispatch => ({
    getCurrentPosition: () => dispatch(mapActions.getCurrentPosition()),
});

@withRouter
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class HomeContainer extends React.PureComponent {
    static propTypes = {
        getCurrentPosition: PropTypes.func.isRequired,
        currentPosition: PropTypes.object.isRequired,
    };

    render() {
        const { getCurrentPosition, currentPosition } = this.props;
        return <Home currentPosition={currentPosition} getCurrentPosition={getCurrentPosition} />;
    }
}

export default HomeContainer;
