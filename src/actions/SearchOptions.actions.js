import classificationsService from 'services/classifications';
import snackbarUtils from 'utils/snackbarUtils';
import states from 'constants/states.constants';

const selectClassificationAction = ({ classificationId }) => ({
    type: states.SELECT_CLASSIFICATION,
    classificationId,
});

const getClassificationsLoadingAction = () => ({ type: states.GET_CLASSIFICATIONS.loading });
const getClassificationsFailureAction = () => ({ type: states.GET_CLASSIFICATIONS.failure });
const getClassificationsSuccessAction = ({ classifications }) => ({
    type: states.GET_CLASSIFICATIONS.success,
    classifications,
});

const getClassifications = () => async (dispatch, getState) => {
    const errorMessage = 'Could not get the classifications';
    const {
        app: {
            configuration: { musicApiKey },
        },
    } = getState();
    dispatch(getClassificationsLoadingAction());
    try {
        const result = await classificationsService.getClassifications({ musicApiKey });
        if (result.status !== 200) {
            dispatch(snackbarUtils.displaySnackbarError({ message: errorMessage }));
        } else {
            dispatch(getClassificationsSuccessAction({ classifications: result.data }));
        }
    } catch (error) {
        dispatch(getClassificationsFailureAction());
        dispatch(snackbarUtils.displaySnackbarError({ message: errorMessage }));
    }
};

const selectClassification = ({ classificationId }) => dispatch => {
    dispatch(selectClassificationAction({ classificationId }));
};

export default {
    getClassifications,
    selectClassification,
};
