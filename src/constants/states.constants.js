const generateAsyncStates = state => ({
    loading: `${state}_LOADING`,
    success: `${state}_SUCCESS`,
    failure: `${state}_FAILURE`,
});

const states = {
    UPDATE_CURRENT_POSITION: 'UPDATE_CURRENT_POSITION',
    CLOSE_SNACKBAR: 'CLOSE_SNACKBAR',
    REQUEST_SHOW_SNACKBAR: 'REQUEST_SHOW_SNACKBAR',
    GET_CURRENT_POSITION: generateAsyncStates('GET_CURRENT_POSITION'),
    GET_UPCOMING_EVENTS: generateAsyncStates('GET_UPCOMING_EVENTS'),
    GET_CONFIGURATION: generateAsyncStates('GET_CONFIGURATION'),
};

export default states;
