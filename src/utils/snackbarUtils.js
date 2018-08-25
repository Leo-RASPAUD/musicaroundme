import snackbarActions from 'components/Snackbar/Snackbar.actions';
import snackbarTypes from 'utils/snackbarTypes';

const displaySnackbar = ({ message, type, duration }) => ({
    type: snackbarActions.states.REQUEST_SHOW_SNACKBAR,
    isSnackbarDisplayed: true,
    snackbarMessage: message,
    snackbarType: type,
    duration,
});

export default {
    displaySnackbarError: ({ message, duration }) =>
        displaySnackbar({ message, type: snackbarTypes.ERROR, duration }),
    displaySnackbarWarning: ({ message, duration }) =>
        displaySnackbar({ message, type: snackbarTypes.WARN, duration }),
    displaySnackbarInfo: ({ message, duration }) =>
        displaySnackbar({ message, type: snackbarTypes.INFO, duration }),
    displaySnackbarSuccess: ({ message, duration }) =>
        displaySnackbar({ message, type: snackbarTypes.SUCCESS, duration }),
};
