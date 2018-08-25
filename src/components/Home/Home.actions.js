const states = {
    GET_CURRENT_POSITION_LOADING: 'GET_CURRENT_POSITION_LOADING',
    GET_CURRENT_POSITION_SUCCESS: 'GET_CURRENT_POSITION_SUCCESS',
};

const getCurrentPositionLoading = () => ({ type: states.GET_CURRENT_POSITION_LOADING });
const getCurrentPositionLoadingSuccess = ({ currentPosition }) => ({
    type: states.GET_CURRENT_POSITION_SUCCESS,
    currentPosition,
});

const getCurrentPosition = () => async dispatch => {
    dispatch(getCurrentPositionLoading());
    if (navigator.geolocation) {
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
    }
};

export default {
    states,
    getCurrentPosition,
};
