import states from 'constants/states.constants';

const initialState = {
    currentPosition: {},
    zoom: 10,
    event: {},
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case states.GET_CURRENT_POSITION.success:
            return {
                ...state,
                currentPosition: {
                    lat: action.currentPosition.lat,
                    lng: action.currentPosition.lng,
                },
                zoom: 14,
            };
        case states.UPDATE_CURRENT_POSITION:
            return {
                ...state,
                currentPosition: action.position,
            };
        case states.ZOOM_ON_EVENT:
            return {
                ...state,
                zoom: action.zoom || state.zoom,
                currentPosition: action.position,
                event: action.event,
            };
        default:
            return state;
    }
};

export default appReducer;
