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
    event: state.map.event,
    gmapsApiKey: state.app.configuration.gmapsApiKey,
    upcomingEvents: state.events.upcomingEvents,
});

const mapDispatchToProps = dispatch => ({
    getCurrentPosition: () => dispatch(actions.getCurrentPosition()),
    updateCurrentPosition: ({ position }) => dispatch(actions.updateCurrentPosition({ position })),
    getEvents: ({ position }) => dispatch(eventsActions.getEvents({ position })),
    zoomOnEvent: ({ position, zoom, event }) =>
        dispatch(eventsActions.zoomOnEvent({ position, zoom, event })),
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
        zoomOnEvent: PropTypes.func.isRequired,
        updateCurrentPosition: PropTypes.func.isRequired,
    };

    componentDidUpdate = prevProps => {
        const {
            props: { position, getEvents },
        } = this;
        const { lat, lng } = position;
        if (
            Math.abs(prevProps.position.lat - lat) > 0.5 ||
            Math.abs(prevProps.position.lng - lng) > 0.5
        ) {
            getEvents({ position });
        }
    };

    onDragEnd = ({ center }) => {
        const { getEvents, updateCurrentPosition, position } = this.props;
        if (
            Math.abs(center.lat - position.lat) > 0.1 ||
            Math.abs(center.lng - position.lng) > 0.1
        ) {
            const newPosition = {
                lat: center.lat,
                lng: center.lng,
            };
            getEvents({ position: newPosition });
            updateCurrentPosition({ position: newPosition });
        }
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
                zoomOnEvent,
            },
        } = this;
        return (
            <Map
                getCurrentPosition={getCurrentPosition}
                gmapsApiKey={gmapsApiKey}
                upcomingEvents={upcomingEvents}
                position={position}
                zoom={zoom}
                zoomOnEvent={zoomOnEvent}
                onDragEnd={this.onDragEnd}
                getEvents={getEvents}
                updateCurrentPosition={updateCurrentPosition}
            />
        );
    }
}

export default MapContainer;
