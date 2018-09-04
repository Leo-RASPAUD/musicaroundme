import configurationService from 'services/configuration';
import states from 'constants/states.constants';

const getConfigurationLoadingAction = () => ({ type: states.GET_CONFIGURATION.loading });

const getConfigurationSuccessAction = ({ configuration }) => ({
    type: states.GET_CONFIGURATION.success,
    configuration,
});

const getConfigurationFailureAction = ({ error }) => ({
    type: states.GET_CONFIGURATION.failure,
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
};
