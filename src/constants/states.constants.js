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
    ...generateStaticState('SELECT_EVENT'),
    ...generateStaticState('ZOOM_ON_VENUE'),
    ...generateStaticState('SELECT_CLASSIFICATION'),
    ...generateStaticState('SELECT_MONTH'),
    ...generateStaticState('UPDATE_ARTIST'),

    ...generateAsyncStates('GET_CURRENT_POSITION'),
    ...generateAsyncStates('GET_UPCOMING_EVENTS'),
    ...generateAsyncStates('GET_CONFIGURATION'),
    ...generateAsyncStates('GET_CLASSIFICATIONS'),
};

export default states;
