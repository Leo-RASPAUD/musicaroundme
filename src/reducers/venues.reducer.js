import states from 'constants/states.constants';

// const removeDuplicatesName = (obj, pos, arr) =>
//     arr.map(mapObj => mapObj.name).indexOf(obj.name) === pos;

const initialState = {
    items: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case states.GET_UPCOMING_EVENTS.success: {
            const currentPosition = {};
            const venuesNoDuplicates = [];
            const venues = action.upcomingEvents.map(event => event.venue);

            for (let i = 0; i < venues.length; i += 1) {
                const element = venues[i];
                if (!element.id) {
                    element.id = -1;
                    currentPosition.lat = element.lat;
                    currentPosition.lng = element.lng;
                }
                if (!element.lat || !element.lng) {
                    element.lat = currentPosition.lat;
                    element.lng = currentPosition.lng;
                }

                const alreadyExists = venuesNoDuplicates.find(venue => venue.id === element.id);
                if (!alreadyExists) {
                    venuesNoDuplicates.push(element);
                }
            }
            return {
                ...state,
                items: venuesNoDuplicates,
            };
        }
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
