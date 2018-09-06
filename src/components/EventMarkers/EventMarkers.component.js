import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import utils from './EventMarkers.utils';

const { formatEvents } = utils;

const EventMarkers = props => {
    const { upcomingEvents } = props;
    const events = formatEvents(upcomingEvents);
    return events.map((event, index) => (
        <Marker
            key={event.id}
            position={event}
            label={`${index}`}
            animation={google.maps.Animation.DROP}
        />
    ));
};

EventMarkers.PropTypes = {
    upcomingEvents: PropTypes.array.isRequired,
};

export default EventMarkers;
