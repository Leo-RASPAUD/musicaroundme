import snackbarTypes from 'utils/snackbarTypes';
import states from 'constants/states.constants';

const closeSnackbarAction = () => ({
    type: states.CLOSE_SNACKBAR,
    isSnackbarDisplayed: false,
    snackbarMessage: '',
    snackbarType: snackbarTypes.INFO,
});

const closeSnackbar = () => dispatch => {
    dispatch(closeSnackbarAction());
};

export default {
    closeSnackbar,
};
