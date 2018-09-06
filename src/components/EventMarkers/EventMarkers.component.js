import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import utils from 'utils/event.utils';

const { formatEvents } = utils;

const EventMarkers = props => {
    const { upcomingEvents, zoomOnEvent } = props;
    const events = formatEvents(upcomingEvents);
    return events.map(event => (
        <Marker
            key={event.id}
            position={event}
            animation={google.maps.Animation.DROP}
            onClick={() =>
                zoomOnEvent({
                    position: { lat: event.lat, lng: event.lng },
                    zoom: 16,
                    event,
                })
            }
        />
    ));
};

EventMarkers.propTypes = {
    upcomingEvents: PropTypes.array.isRequired,
    zoomOnEvent: PropTypes.func.isRequired,
};

export default EventMarkers;
