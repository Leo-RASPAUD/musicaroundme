import configurationService from 'services/configuration';

const states = {
    GET_CONFIGURATION_LOADING: 'GET_CONFIGURATION_LOADING',
    GET_CONFIGURATION_SUCCESS: 'GET_CONFIGURATION_SUCCESS',
    GET_CONFIGURATION_FAILURE: 'GET_CONFIGURATION_FAILURE',
};

const getConfigurationLoadingAction = () => ({ type: states.GET_CONFIGURATION_LOADING });

const getConfigurationSuccessAction = ({ configuration }) => ({
    type: states.GET_CONFIGURATION_SUCCESS,
    configuration,
});

const getConfigurationFailureAction = ({ error }) => ({
    type: states.GET_CONFIGURATION_FAILURE,
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

export default {
    getConfiguration,
    states,
};
