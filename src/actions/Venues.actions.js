import venuesService from 'services/venues';
import snackbarUtils from 'utils/snackbarUtils';
import states from 'constants/states.constants';

const getVenueLoadingAction = () => ({ type: states.GET_VENUE.loading });
const getVenueFailureAction = () => ({ type: states.GET_VENUE.failure });
const getVenueSuccessAction = ({ venue, zoom, position }) => ({
    type: states.GET_VENUE.success,
    venue,
    zoom,
    position,
});

const zoomOnVenue = ({ position, zoom, venueId }) => async (dispatch, getState) => {
    const errorMessage = 'Could not get the venue details';
    const {
        app: {
            configuration: { musicApiKey },
        },
    } = getState();
    dispatch(getVenueLoadingAction());
    try {
        const result = await venuesService.getVenue({ position, musicApiKey, venueId });
        if (result.status !== 200) {
            dispatch(snackbarUtils.displaySnackbarError({ message: errorMessage }));
        } else {
            dispatch(getVenueSuccessAction({ venue: result.data, zoom, position }));
        }
    } catch (error) {
        dispatch(getVenueFailureAction());
        dispatch(snackbarUtils.displaySnackbarError({ message: errorMessage }));
    }
};

export default {
    zoomOnVenue,
};
