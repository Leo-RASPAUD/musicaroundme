import HomeActions from 'components/Home/Home.actions';
import AppActions from 'components/App/App.actions';

const initialState = {
    currentPosition: {},
    zoom: 10,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeActions.states.GET_CURRENT_POSITION_SUCCESS:
            return {
                ...state,
                currentPosition: action.currentPosition,
                zoom: 14,
            };
        case AppActions.states.GET_LOCALISATION_SUCCESS:
            return {
                ...state,
                currentPosition: {
                    lat: action.localisation.latitude,
                    lng: action.localisation.longitude,
                },
            };
        default:
            return state;
    }
};

export default appReducer;
