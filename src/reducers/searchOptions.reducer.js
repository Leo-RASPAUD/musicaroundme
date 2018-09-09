import states from 'constants/states.constants';

const initialState = {
    classifications: [],
    selectedClassificationId: 'All',
    selectedMonth: 'All',
    artist: '',
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
        case states.UPDATE_ARTIST:
            return {
                ...state,
                artist: action.artist,
            };
        default:
            return state;
    }
};

export default appReducer;
