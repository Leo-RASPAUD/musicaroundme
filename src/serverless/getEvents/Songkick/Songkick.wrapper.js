const moment = require('moment');

class EventWrapper {
    constructor(event) {
        const { venue } = event;
        this.setVenue({ venue });
        this.setEvent({ event });
    }

    setEvent({ event }) {
        const links = {};

        let startDateTime = 'Unknown';
        if (event.start.datetime) {
            startDateTime = moment(event.start.datetime, 'YYYY-MM-DDTHH:mm:ssZZ');
        } else if (event.start.date && event.start.time) {
            startDateTime = moment(
                `${event.start.date}T${event.start.time}`,
                'YYYY-MM-DDTHH:mm:ss',
            );
        } else if (event.start.date) {
            startDateTime = moment(event.start.date, 'YYYY-MM-DD');
        }

        this._event = {
            genre: 'Unknown',
            url: event.uri,
            id: event.id,
            name: event.type === 'Concert' ? event.performance[0].displayName : event.displayName,
            links,
            avatarUrl: '',
            statusCode: event.status,
            startDateTime,
        };
    }

    setVenue({ venue }) {
        this._venue = {
            address: '',
            city: (venue && venue.metroArea && venue.metroArea.displayName) || '',
            country:
                (venue &&
                    venue.metroArea &&
                    venue.metroArea.country &&
                    venue.metroArea.country.displayName) ||
                '',
            id: venue.id,
            imageUrl: 'https://source.unsplash.com/300x100/?music',
            url: venue.uri,
            name: venue.displayName,
            upcomingEvents: 0,
            lat: venue.lat,
            lng: venue.lng,
        };
    }

    get event() {
        return this._event;
    }

    get venue() {
        return this._venue;
    }
}

module.exports = {
    EventWrapper,
};
