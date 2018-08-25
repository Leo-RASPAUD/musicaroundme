import configurationService from 'services/configuration';

const states = {
    GET_CONFIGURATION_LOADING: 'GET_CONFIGURATION_LOADING',
    GET_CONFIGURATION_SUCCESS: 'GET_CONFIGURATION_SUCCESS',
    GET_CONFIGURATION_FAILURE: 'GET_CONFIGURATION_FAILURE',
    GET_LOCALISATION_LOADING: 'GET_LOCALISATION_LOADING',
    GET_LOCALISATION_SUCCESS: 'GET_LOCALISATION_SUCCESS',
    GET_LOCALISATION_FAILURE: 'GET_LOCALISATION_FAILURE',
};

const getConfigurationLoadingAction = () => ({ type: states.GET_CONFIGURATION_LOADING });
const getLocalisationLoadingAction = () => ({ type: states.GET_LOCALISATION_LOADING });

const getConfigurationSuccessAction = ({ configuration }) => ({
    type: states.GET_CONFIGURATION_SUCCESS,
    configuration,
});
const getlocalisationSuccessAction = ({ localisation }) => ({
    type: states.GET_LOCALISATION_SUCCESS,
    localisation,
});

const getConfigurationFailureAction = ({ error }) => ({
    type: states.GET_CONFIGURATION_FAILURE,
    error,
});

const getlocalisationFailureAction = ({ error }) => ({
    type: states.GET_LOCALISATION_FAILURE,
    error,
});

const getConfiguration = () => async dispatch => {
    dispatch(getConfigurationLoadingAction());
    try {
        const result = await configurationService.getConfiguration();
        dispatch(getConfigurationSuccessAction({ configuration: result.data }));
    } catch (error) {
        dispatch(getConfigurationFailureAction({ error }));
    }
};
const getLocalisation = () => async (dispatch, getState) => {
    dispatch(getLocalisationLoadingAction());
    const {
        app: {
            configuration: { ipApiKey },
        },
    } = getState();
    try {
        const result = await configurationService.getLocalisation({ apiKey: ipApiKey });
        dispatch(getlocalisationSuccessAction({ localisation: result.data }));
    } catch (error) {
        dispatch(getlocalisationFailureAction({ error }));
    }
};

export default {
    getConfiguration,
    getLocalisation,
    states,
};
