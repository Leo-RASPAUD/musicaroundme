import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home.component';
import actions from './Home.actions';

const mapStateToProps = state => ({
    currentPosition: state.home.currentPosition,
    zoom: state.home.zoom,
    gmapsApiKey: state.app.configuration.gmapsApiKey,
    upcomingEvents: state.events.upcomingEvents,
});

const mapDispatchToProps = dispatch => ({
    getCurrentPosition: () => dispatch(actions.getCurrentPosition()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Home),
);
