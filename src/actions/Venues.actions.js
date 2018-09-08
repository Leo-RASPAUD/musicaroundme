import states from 'constants/states.constants';

const zoomOnVenueAction = ({ venueId, position, zoom }) => ({
    type: states.ZOOM_ON_VENUE,
    venueId,
    position,
    zoom,
});

const zoomOnVenue = ({ venueId, position, zoom }) => dispatch => {
    dispatch(zoomOnVenueAction({ venueId, position, zoom }));
};

export default {
    zoomOnVenue,
};
