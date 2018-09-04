import snackbarTypes from 'utils/snackbarTypes';
import states from 'constants/states.constants';

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
        newState.snackbarMessage = action.message;
        newState.isSnackbarDisplayed = true;
        newState.snackbarType = snackbarTypes.ERROR;
    }
    switch (action.type) {
        case states.REQUEST_SHOW_SNACKBAR:
        case states.CLOSE_SNACKBAR:
            return {
                ...newState,
                isSnackbarDisplayed: action.isSnackbarDisplayed,
                snackbarMessage: action.snackbarMessage,
                snackbarType: action.snackbarType,
                snackbarDuration: action.snackbarDuration || state.snackbarDuration,
            };
        case states.GET_CONFIGURATION.success:
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
