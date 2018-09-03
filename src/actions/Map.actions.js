const states = {
    GET_CURRENT_POSITION_LOADING: 'GET_CURRENT_POSITION_LOADING',
    GET_CURRENT_POSITION_SUCCESS: 'GET_CURRENT_POSITION_SUCCESS',
    UPDATE_CURRENT_POSITION: 'UPDATE_CURRENT_POSITION',
};

const updateCurrentPositionAction = ({ position }) => ({
    type: states.UPDATE_CURRENT_POSITION,
    position,
});
const getCurrentPositionLoading = () => ({ type: states.GET_CURRENT_POSITION_LOADING });
const getCurrentPositionLoadingSuccess = ({ currentPosition }) => ({
    type: states.GET_CURRENT_POSITION_SUCCESS,
    currentPosition,
});

const getCurrentPosition = () => async dispatch => {
    dispatch(getCurrentPositionLoading());
    const currentPosition = await new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(result => {
            const {
                coords: { latitude, longitude },
            } = result;
            resolve({
                lat: latitude,
                lng: longitude,
            });
        });
    });
    dispatch(getCurrentPositionLoadingSuccess({ currentPosition }));
};

const updateCurrentPosition = ({ position }) => async dispatch => {
    dispatch(updateCurrentPositionAction({ position }));
};

export default {
    states,
    getCurrentPosition,
    updateCurrentPosition,
};
