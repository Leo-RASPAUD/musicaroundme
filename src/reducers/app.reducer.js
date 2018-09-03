import AppActions from 'actions/App.actions';
import snackbarTypes from 'utils/snackbarTypes';
import SnackbarActions from 'components/Snackbar/Snackbar.actions';

const initialState = {
    configuration: {},
    isLoadingConfiguration: true,
    isSnackbarDisplayed: false,
    snackbarMessage: '',
    snackbarType: snackbarTypes.INFO,
    snackbarDuration: 5000,
};

const appReducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type.match(/FAILURE/)) {
        newState.snackbarMessage = action.error;
        newState.isSnackbarDisplayed = true;
        newState.snackbarType = snackbarTypes.ERROR;
    }
    switch (action.type) {
        case SnackbarActions.states.REQUEST_SHOW_SNACKBAR:
        case SnackbarActions.states.CLOSE_SNACKBAR:
            return {
                ...newState,
                isSnackbarDisplayed: action.isSnackbarDisplayed,
                snackbarMessage: action.snackbarMessage,
                snackbarType: action.snackbarType,
                snackbarDuration: action.snackbarDuration || state.snackbarDuration,
            };
        case AppActions.states.GET_CONFIGURATION_SUCCESS:
            return {
                ...state,
                isLoadingConfiguration: false,
                configuration: action.configuration.Items.reduce(
                    (a, b) => ({ ...a, [b.id.S]: b.value.S }),
                    {},
                ),
            };
        default:
            return newState;
    }
};

export default appReducer;
