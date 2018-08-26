import events from 'services/events';

const states = {
    GET_UPCOMING_EVENTS_LOADING: 'GET_UPCOMING_EVENTS_LOADING',
    GET_UPCOMING_EVENTS_SUCCESS: 'GET_UPCOMING_EVENTS_SUCCESS',
};

const getEventsLoadingAction = () => ({ type: states.GET_UPCOMING_EVENTS_LOADING });
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
    const result = await events.getEvents({ position, musicApiKey });
    if (result.status !== 200) {
        console.log(result);
    } else {
        dispatch(getEventsSuccessAction({ upcomingEvents: result.data }));
    }
};

export default {
    states,
    getEvents,
};
