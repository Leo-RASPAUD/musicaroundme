import states from 'constants/states.constants';

const updateCurrentPositionAction = ({ position }) => ({
    type: states.UPDATE_CURRENT_POSITION,
    position,
});
const getCurrentPositionLoading = () => ({ type: states.GET_CURRENT_POSITION.loading });
const getCurrentPositionLoadingSuccess = ({ currentPosition }) => ({
    type: states.GET_CURRENT_POSITION.success,
    currentPosition,
});
const getCurrentPositionLoadingFailure = ({ message }) => ({
    type: states.GET_CURRENT_POSITION.failure,
    message,
});

const getCurrentPosition = () => async dispatch => {
    dispatch(getCurrentPositionLoading());
    try {
        const currentPosition = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                result => {
                    const {
                        coords: { latitude, longitude },
                    } = result;
                    resolve({
                        lat: latitude,
                        lng: longitude,
                    });
                },
                () => {
                    reject(new Error('You need to allow location tracking to use this website.'));
                },
            );
        });
        dispatch(getCurrentPositionLoadingSuccess({ currentPosition }));
    } catch (error) {
        dispatch(getCurrentPositionLoadingFailure({ message: error.message }));
    }
};

const updateCurrentPosition = ({ position }) => async dispatch => {
    dispatch(updateCurrentPositionAction({ position }));
};

export default {
    getCurrentPosition,
    updateCurrentPosition,
};
