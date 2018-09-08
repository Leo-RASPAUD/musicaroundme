const generateAsyncStates = state => ({
    [state]: {
        loading: `${state}_LOADING`,
        success: `${state}_SUCCESS`,
        failure: `${state}_FAILURE`,
    },
});

const generateStaticState = state => ({ [state]: state });

const states = {
    ...generateStaticState('UPDATE_CURRENT_POSITION'),
    ...generateStaticState('CLOSE_SNACKBAR'),
    ...generateStaticState('REQUEST_SHOW_SNACKBAR'),
    ...generateAsyncStates('GET_VENUE'),
    ...generateAsyncStates('GET_CURRENT_POSITION'),
    ...generateAsyncStates('GET_UPCOMING_EVENTS'),
    ...generateAsyncStates('GET_CONFIGURATION'),
};

export default states;
