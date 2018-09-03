import EventsActions from 'actions/Events.actions';

const initialState = {
    upcomingEvents: [],
    loading: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case EventsActions.states.GET_UPCOMING_EVENTS_SUCCESS:
            return {
                ...state,
                upcomingEvents: action.upcomingEvents,
                loading: state.loading.slice(1) || [],
            };
        case EventsActions.states.GET_UPCOMING_EVENTS_FAILURE:
            return {
                ...state,
                loading: state.loading.slice(1) || [],
            };
        case EventsActions.states.GET_UPCOMING_EVENTS_LOADING:
            return {
                ...state,
                upcomingEvents: [],
                loading: state.loading.concat('loading'),
            };
        default:
            return state;
    }
};

export default appReducer;
