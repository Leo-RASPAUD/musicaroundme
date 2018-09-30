import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Marker } from 'react-google-maps';

const VenueMarkers = props => {
    const { venues, zoomOnVenue } = props;
    return venues.map(venue => {
        const { details } = venue;
        const { lat, lng } = details;
        const position = { lat, lng };
        return (
            <Marker
                key={details.id || uuid()}
                position={position}
                animation={google.maps.Animation.DROP}
                onClick={() =>
                    zoomOnVenue({
                        position,
                        zoom: 16,
                        venueId: details.id,
                    })
                }
            />
        );
    });
};

VenueMarkers.propTypes = {
    venues: PropTypes.array.isRequired,
    zoomOnVenue: PropTypes.func.isRequired,
};

export default VenueMarkers;
