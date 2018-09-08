import states from 'constants/states.constants';
import moment from 'moment';

const initialState = {
    classifications: [],
    selectedClassificationId: 'All',
    selectedMonth: moment().format('MMMM'),
    loading: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case states.GET_CLASSIFICATIONS.success:
            return {
                ...state,
                classifications: action.classifications,
                loading: state.loading.slice(1) || [],
            };
        case states.GET_CLASSIFICATIONS.failure:
            return {
                ...state,
                loading: state.loading.slice(1) || [],
            };
        case states.GET_CLASSIFICATIONS.loading:
            return {
                ...state,
                classifications: [],
                loading: state.loading.concat('loading'),
            };
        case states.SELECT_CLASSIFICATION:
            return {
                ...state,
                selectedClassificationId: action.classificationId,
            };
        case states.SELECT_MONTH:
            return {
                ...state,
                selectedMonth: action.selectedMonth,
            };
        default:
            return state;
    }
};

export default appReducer;
