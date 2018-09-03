import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import eventsActions from 'actions/Events.actions';
import Map from './Map.component';
import actions from './Map.actions';

const mapStateToProps = state => ({
    position: state.map.currentPosition,
    zoom: state.map.zoom,
    gmapsApiKey: state.app.configuration.gmapsApiKey,
    upcomingEvents: state.events.upcomingEvents,
});

const mapDispatchToProps = dispatch => ({
    getCurrentPosition: () => dispatch(actions.getCurrentPosition()),
    updateCurrentPosition: ({ position }) => dispatch(actions.updateCurrentPosition({ position })),
    getEvents: ({ position }) => dispatch(eventsActions.getEvents({ position })),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Map),
);
