const formatEvents = events =>
    events
        .map(event => {
            const { location } = event._embedded.venues[0];
            if (location) {
                return {
                    ...event,
                    lat: +location.latitude,
                    lng: +location.longitude,
                };
            }
            return null;
        })
        .filter(item => item);

const formatVenues = venues =>
    venues
        .map(venue => {
            const { location } = venue;
            if (location) {
                return {
                    ...venue,
                    lat: +location.latitude,
                    lng: +location.longitude,
                };
            }
            return null;
        })
        .filter(item => item);

export default { formatEvents, formatVenues };
