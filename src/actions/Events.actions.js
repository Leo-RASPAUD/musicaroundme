import events from 'services/events';
import audioDbService from 'services/audioDb';
import snackbarUtils from 'utils/snackbarUtils';
import states from 'constants/states.constants';

const getEventsLoadingAction = () => ({ type: states.GET_UPCOMING_EVENTS.loading });
const getEventsFailureAction = () => ({ type: states.GET_UPCOMING_EVENTS.failure });
const getEventsSuccessAction = ({ upcomingEvents }) => ({
    type: states.GET_UPCOMING_EVENTS.success,
    upcomingEvents,
});

const getEvents = ({ position }) => async (dispatch, getState) => {
    const {
        app: {
            configuration: { musicApiKey },
        },
    } = getState();
    dispatch(getEventsLoadingAction());
    try {
        const result = await events.getEvents({ position, musicApiKey });
        if (result.status !== 200) {
            dispatch(snackbarUtils.displaySnackbarError({ message: 'Could not get the events' }));
        } else {
            const artists = result.data.map(item =>
                item.performance.map(artist => artist.displayName),
            );
            const noDuplicates = [...new Set(artists)];
            const audioDbData = await audioDbService.getInformation({ artists: noDuplicates });
            console.log(audioDbData);
            dispatch(getEventsSuccessAction({ upcomingEvents: result.data }));
        }
    } catch (error) {
        dispatch(getEventsFailureAction());
        dispatch(snackbarUtils.displaySnackbarError({ message: 'Could not get the events' }));
    }
};

export default {
    getEvents,
};