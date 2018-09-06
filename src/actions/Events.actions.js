import events from 'services/events';
import snackbarUtils from 'utils/snackbarUtils';
import states from 'constants/states.constants';

const zoomOnEventAction = ({ position, zoom, event }) => ({
    type: states.ZOOM_ON_EVENT,
    position,
    zoom,
    event,
});
const getEventsLoadingAction = () => ({ type: states.GET_UPCOMING_EVENTS.loading });
const getEventsFailureAction = () => ({ type: states.GET_UPCOMING_EVENTS.failure });
const getEventsSuccessAction = ({ upcomingEvents }) => ({
    type: states.GET_UPCOMING_EVENTS.success,
    upcomingEvents,
});

const getEvents = ({ position }) => async (dispatch, getState) => {
    const {
        app: {
            configuration: { musicApiKey },
        },
    } = getState();
    dispatch(getEventsLoadingAction());
    try {
        const result = await events.getEvents({ position, musicApiKey });
        if (result.status !== 200) {
            dispatch(snackbarUtils.displaySnackbarError({ message: 'Could not get the events' }));
        } else {
            dispatch(getEventsSuccessAction({ upcomingEvents: result.data }));
        }
    } catch (error) {
        dispatch(getEventsFailureAction());
        dispatch(snackbarUtils.displaySnackbarError({ message: 'Could not get the events' }));
    }
};

const zoomOnEvent = ({ position, zoom, event }) => dispatch => {
    dispatch(zoomOnEventAction({ position, zoom, event }));
};

export default {
    getEvents,
    zoomOnEvent,
};
