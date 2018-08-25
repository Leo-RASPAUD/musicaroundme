import HomeActions from 'components/Home/Home.actions';

const initialState = {
    currentPosition: {
        lat: 48.8485004,
        lng: 2.3264593,
    },
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeActions.states.GET_CURRENT_POSITION_SUCCESS:
            return {
                ...state,
                currentPosition: action.currentPosition,
            };
        default:
            return state;
    }
};

export default appReducer;
