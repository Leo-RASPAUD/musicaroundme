import EventsActions from 'components/Events/Events.actions';

const initialState = {
    upcomingEvents: [],
    loading: true,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case EventsActions.states.GET_UPCOMING_EVENTS_SUCCESS:
            return {
                ...state,
                upcomingEvents: action.upcomingEvents,
                loading: false,
            };
        case EventsActions.states.GET_UPCOMING_EVENTS_LOADING:
            return {
                ...state,
                upcomingEvents: [],
                loading: true,
            };
        default:
            return state;
    }
};

export default appReducer;
