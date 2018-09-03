import events from 'services/events';
import snackbarUtils from 'utils/snackbarUtils';

const states = {
    GET_UPCOMING_EVENTS_LOADING: 'GET_UPCOMING_EVENTS_LOADING',
    GET_UPCOMING_EVENTS_SUCCESS: 'GET_UPCOMING_EVENTS_SUCCESS',
    GET_UPCOMING_EVENTS_FAILURE: 'GET_UPCOMING_EVENTS_FAILURE',
};

const getEventsLoadingAction = () => ({ type: states.GET_UPCOMING_EVENTS_LOADING });
const getEventsFailureAction = () => ({ type: states.GET_UPCOMING_EVENTS_FAILURE });
const getEventsSuccessAction = ({ upcomingEvents }) => ({
    type: states.GET_UPCOMING_EVENTS_SUCCESS,
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

export default {
    states,
    getEvents,
};
