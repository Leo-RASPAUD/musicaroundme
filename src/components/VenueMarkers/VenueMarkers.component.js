import React from 'react';
import PropTypes from 'prop-types';
import { Marker, OverlayView } from 'react-google-maps';
import VenueInfo from 'components/VenueInfo/VenueInfo.component';

const VenueMarkers = props => {
    const { venues, zoomOnVenue } = props;
    return venues.map(venue => (
        <Marker
            key={venue.id}
            position={venue}
            animation={google.maps.Animation.DROP}
            onClick={() =>
                zoomOnVenue({
                    position: { lat: venue.lat, lng: venue.lng },
                    zoom: 16,
                    venueId: venue.id,
                })
            }
        >
            {venue.selected && (
                <OverlayView
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    position={{ lat: venue.lat, lng: venue.lng }}
                >
                    <VenueInfo venue={venue} />
                </OverlayView>
            )}
        </Marker>
    ));
};

VenueMarkers.propTypes = {
    venues: PropTypes.array.isRequired,
    zoomOnVenue: PropTypes.func.isRequired,
};

export default VenueMarkers;
