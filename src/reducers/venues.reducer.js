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
            let venuesNoDuplicates = [];
            for (let i = 0; i < action.upcomingEvents.length; i += 1) {
                const element = action.upcomingEvents[i];
                const { venue } = element;
                if (!venue.id) {
                    venue.id = -1;
                    currentPosition.lat = venue.lat;
                    currentPosition.lng = venue.lng;
                }
                if (!venue.lat || !venue.lng) {
                    venue.lat = currentPosition.lat;
                    venue.lng = currentPosition.lng;
                }

                const alreadyExists = venuesNoDuplicates.find(
                    venueNoDuplicate => venueNoDuplicate.details.id === venue.id,
                );
                if (!alreadyExists) {
                    venuesNoDuplicates.push({ details: venue, events: [element.event] });
                } else {
                    venuesNoDuplicates = venuesNoDuplicates.map(venueNoDuplicate => {
                        if (venueNoDuplicate.details.id === venue.id) {
                            return {
                                ...venueNoDuplicate,
                                events: venueNoDuplicate.events.concat(element.event),
                            };
                        }
                        return venueNoDuplicate;
                    });
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
                    if (venue.details.id === action.venueId) {
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
