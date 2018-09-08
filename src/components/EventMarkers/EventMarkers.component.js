import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import utils from 'utils/event.utils';

const { formatEvents } = utils;

const EventMarkers = props => {
    const { upcomingEvents, zoomOnVenue } = props;
    const events = formatEvents(upcomingEvents);
    return events.map(event => (
        <Marker
            key={event.id}
            position={event}
            animation={google.maps.Animation.DROP}
            onClick={() =>
                zoomOnVenue({
                    position: { lat: event.lat, lng: event.lng },
                    zoom: 16,
                    venueId: event._embedded.venues[0].id,
                })
            }
        />
    ));
};

EventMarkers.propTypes = {
    upcomingEvents: PropTypes.array.isRequired,
    zoomOnVenue: PropTypes.func.isRequired,
};

export default EventMarkers;
