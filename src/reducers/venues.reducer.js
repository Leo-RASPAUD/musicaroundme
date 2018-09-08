import states from 'constants/states.constants';

const initialState = {
    selectedVenue: {},
    loading: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case states.GET_VENUE.success:
            return {
                ...state,
                selectedVenue: action.venue,
                loading: state.loading.slice(1) || [],
            };
        case states.GET_VENUE.failure:
            return {
                ...state,
                selectedVenue: {},
                loading: state.loading.slice(1) || [],
            };
        case states.GET_VENUE.loading:
            return {
                ...state,
                loading: state.loading.concat('loading'),
            };
        default:
            return state;
    }
};

export default appReducer;
