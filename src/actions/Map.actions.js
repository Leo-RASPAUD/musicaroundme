import states from 'constants/states.constants';
import { push } from 'react-router-redux';
import routes from 'utils/routes';

const goToHome = () => push(routes.home);
const updateCurrentPositionAction = ({ position, zoom }) => ({
    type: states.UPDATE_CURRENT_POSITION,
    position,
    zoom,
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

const getCurrentPosition = ({ redirectToHome }) => async dispatch => {
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
        if (redirectToHome) {
            dispatch(goToHome());
        }
    } catch (error) {
        dispatch(getCurrentPositionLoadingFailure({ message: error.message }));
    }
};

const updateCurrentPosition = ({ position, zoom }) => async dispatch => {
    dispatch(updateCurrentPositionAction({ position, zoom }));
};

export default {
    getCurrentPosition,
    updateCurrentPosition,
};
