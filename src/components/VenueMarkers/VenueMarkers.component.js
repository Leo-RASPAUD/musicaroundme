import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Marker, OverlayView } from 'react-google-maps';
import VenueInfo from 'components/VenueInfo/VenueInfo.component';

const VenueMarkers = props => {
    const { venues, zoomOnVenue } = props;
    return venues.map(venue => {
        const position = { lat: venue.lat, lng: venue.lng };
        return (
            <Marker
                key={venue.id || uuid()}
                position={position}
                animation={google.maps.Animation.DROP}
                onClick={() =>
                    zoomOnVenue({
                        position,
                        zoom: 16,
                        venueId: venue.id,
                    })
                }
            >
                {venue.selected && (
                    <OverlayView mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} position={position}>
                        <VenueInfo venue={venue} />
                    </OverlayView>
                )}
            </Marker>
        );
    });
};

VenueMarkers.propTypes = {
    venues: PropTypes.array.isRequired,
    zoomOnVenue: PropTypes.func.isRequired,
};

export default VenueMarkers;
