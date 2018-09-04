import states from 'constants/states.constants';

const initialState = {
    upcomingEvents: [],
    loading: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case states.GET_UPCOMING_EVENTS.success:
            return {
                ...state,
                upcomingEvents: action.upcomingEvents,
                loading: state.loading.slice(1) || [],
            };
        case states.GET_UPCOMING_EVENTS.failure:
            return {
                ...state,
                loading: state.loading.slice(1) || [],
            };
        case states.GET_UPCOMING_EVENTS.loading:
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
