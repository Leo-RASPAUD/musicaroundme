import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from 'components/Home/Home.component';

const mapStateToProps = state => ({
    currentPosition: state.map.currentPosition,
    zoom: state.map.zoom,
    gmapsApiKey: state.app.configuration.gmapsApiKey,
    upcomingEvents: state.events.upcomingEvents,
});

@withRouter
@connect(
    mapStateToProps,
    null,
)
class HomeContainer extends React.PureComponent {
    static propTypes = {
        currentPosition: PropTypes.object.isRequired,
    };

    render() {
        const { currentPosition } = this.props;
        return <Home currentPosition={currentPosition} />;
    }
}

export default HomeContainer;
