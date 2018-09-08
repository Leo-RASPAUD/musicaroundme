import events from 'services/events';
import snackbarUtils from 'utils/snackbarUtils';
import states from 'constants/states.constants';

const selectEventAction = ({ eventId }) => ({ type: states.SELECT_EVENT, eventId });
const getEventsLoadingAction = () => ({ type: states.GET_UPCOMING_EVENTS.loading });
const getEventsFailureAction = () => ({ type: states.GET_UPCOMING_EVENTS.failure });
const getEventsSuccessAction = ({ upcomingEvents }) => ({
    type: states.GET_UPCOMING_EVENTS.success,
    upcomingEvents,
});

const getEvents = ({ position, venueId, classificationId, month }) => async (
    dispatch,
    getState,
) => {
    const errorMessage = 'Could not get the events';
    const {
        app: {
            configuration: { musicApiKey },
        },
        map: { currentPosition },
    } = getState();
    dispatch(getEventsLoadingAction());
    try {
        const result = await events.getEvents({
            position: position || currentPosition,
            musicApiKey,
            venueId,
            classificationId,
            month,
        });
        if (result.status !== 200) {
            dispatch(snackbarUtils.displaySnackbarError({ message: errorMessage }));
        } else {
            dispatch(getEventsSuccessAction({ upcomingEvents: result.data }));
        }
    } catch (error) {
        dispatch(getEventsFailureAction());
        dispatch(snackbarUtils.displaySnackbarError({ message: errorMessage }));
    }
};

const selectEvent = ({ eventId }) => dispatch => {
    dispatch(selectEventAction({ eventId }));
};

export default {
    getEvents,
    selectEvent,
};
