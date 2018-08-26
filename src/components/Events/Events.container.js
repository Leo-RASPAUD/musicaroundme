import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Events from './Events.component';
import actions from './Events.actions';
import MapActions from '../Map/Map.actions';

const mapStateToProps = state => ({
    loading: state.events.loading,
    upcomingEvents: state.events.upcomingEvents,
});

const mapDispatchToProps = dispatch => ({
    getEvents: ({ position }) => dispatch(actions.getEvents({ position })),
    updateCurrentPosition: ({ position }) =>
        dispatch(MapActions.updateCurrentPosition({ position })),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Events),
);
