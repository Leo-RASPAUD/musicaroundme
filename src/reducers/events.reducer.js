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
                upcomingEvents: action.upcomingEvents.map(event => ({ ...event, selected: false })),
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
        case states.SELECT_EVENT:
            return {
                ...state,
                upcomingEvents: state.upcomingEvents.map(item => {
                    if (item.event.id === action.eventId) {
                        return {
                            ...item,
                            selected: true,
                        };
                    }
                    return {
                        ...item,
                        selected: false,
                    };
                }),
            };
        default:
            return state;
    }
};

export default appReducer;
