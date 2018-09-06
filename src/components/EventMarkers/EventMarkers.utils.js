const formatEvents = events =>
    events
        .map(event => {
            const { location } = event._embedded.venues[0];
            if (location) {
                return {
                    lat: +location.latitude,
                    lng: +location.longitude,
                    id: event.id,
                };
            }
            return null;
        })
        .filter(item => item);

export default { formatEvents };
