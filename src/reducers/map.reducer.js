import MapActions from 'actions/Map.actions';

const initialState = {
    currentPosition: {},
    zoom: 10,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case MapActions.states.GET_CURRENT_POSITION_SUCCESS:
            return {
                ...state,
                currentPosition: {
                    lat: action.currentPosition.lat,
                    lng: action.currentPosition.lng,
                },
                zoom: 14,
            };
        case MapActions.states.UPDATE_CURRENT_POSITION:
            return {
                ...state,
                currentPosition: action.position,
            };
        default:
            return state;
    }
};

export default appReducer;
