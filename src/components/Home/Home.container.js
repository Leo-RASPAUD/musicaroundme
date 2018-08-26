import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import mapActions from 'components/Map/Map.actions';
import Home from './Home.component';

const mapStateToProps = state => ({
    currentPosition: state.map.currentPosition,
    zoom: state.map.zoom,
    gmapsApiKey: state.app.configuration.gmapsApiKey,
    upcomingEvents: state.events.upcomingEvents,
});

const mapDispatchToProps = dispatch => ({
    getCurrentPosition: () => dispatch(mapActions.getCurrentPosition()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Home),
);
