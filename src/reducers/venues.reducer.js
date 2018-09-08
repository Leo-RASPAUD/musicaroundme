import states from 'constants/states.constants';

const getVenuesFromEvents = event => {
    const eventVenues = event._embedded.venues;
    if (!eventVenues || eventVenues.length === 0) {
        return null;
    }
    return eventVenues[0];
};

const removeDuplicatesName = (obj, pos, arr) =>
    arr.map(mapObj => mapObj.name).indexOf(obj.name) === pos;

const initialState = {
    items: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case states.GET_UPCOMING_EVENTS.success:
            return {
                ...state,
                items: action.upcomingEvents.map(getVenuesFromEvents).filter(removeDuplicatesName),
            };
        case states.ZOOM_ON_VENUE:
            return {
                ...state,
                items: state.items.map(venue => {
                    if (venue.id === action.venueId) {
                        return {
                            ...venue,
                            selected: true,
                        };
                    }
                    return {
                        ...venue,
                        selected: false,
                    };
                }),
            };
        default:
            return state;
    }
};

export default appReducer;
