import snackbarTypes from 'utils/snackbarTypes';

const states = {
    CLOSE_SNACKBAR: 'CLOSE_SNACKBAR',
    REQUEST_SHOW_SNACKBAR: 'REQUEST_SHOW_SNACKBAR',
};

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
    states,
    closeSnackbar,
};
