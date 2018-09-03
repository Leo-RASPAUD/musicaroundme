import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import eventsActions from 'actions/Events.actions';
import Map from 'components/Map/Map.component';
import actions from 'actions/Map.actions';

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

@withRouter
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class MapContainer extends React.PureComponent {
    static propTypes = {
        position: PropTypes.object.isRequired,
        zoom: PropTypes.number.isRequired,
        gmapsApiKey: PropTypes.string.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
        getEvents: PropTypes.func.isRequired,
        getCurrentPosition: PropTypes.func.isRequired,
        updateCurrentPosition: PropTypes.func.isRequired,
    };

    render() {
        const {
            props: {
                getCurrentPosition,
                gmapsApiKey,
                upcomingEvents,
                position,
                zoom,
                getEvents,
                updateCurrentPosition,
            },
        } = this;
        return (
            <Map
                getCurrentPosition={getCurrentPosition}
                gmapsApiKey={gmapsApiKey}
                upcomingEvents={upcomingEvents}
                position={position}
                zoom={zoom}
                getEvents={getEvents}
                updateCurrentPosition={updateCurrentPosition}
            />
        );
    }
}

export default MapContainer;
