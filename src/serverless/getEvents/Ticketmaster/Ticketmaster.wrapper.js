const moment = require('moment');

const getLink = ({ type, externalLinks }) => {
    if (externalLinks[type] && externalLinks[type].length > 0) {
        return externalLinks[type][0].url;
    }
    return null;
};

class EventWrapper {
    constructor(event) {
        const { _embedded } = event;
        const { venues } = _embedded;
        this.setVenue({ venues });
        this.setEvent({ event });
    }

    setEvent({ event }) {
        const { attractions } = event._embedded;
        const links = {};

        const avatarUrl = event.images && event.images.length > 0 ? event.images[0].url : '';
        const statusCode =
            event.dates && event.dates.status ? event.dates.status.code : 'cancelled';

        const genre =
            event.classifications &&
            event.classifications.length > 0 &&
            event.classifications[0].genre
                ? event.classifications[0].genre.name
                : 'Other';
        const formattedGenre = genre === 'Undefined' ? 'Other' : genre;

        const startDateTime =
            event.dates && event.dates.start && event.dates.start.dateTime
                ? moment(event.dates.start.dateTime)
                : 'Unknown';

        if (attractions && attractions.length > 0) {
            const { externalLinks } = attractions[0];
            if (externalLinks) {
                links.homepage = getLink({ externalLinks, type: 'homepage' });
                links.facebook = getLink({ externalLinks, type: 'facebook' });
                links.wiki = getLink({ externalLinks, type: 'wiki' });
                links.youtube = getLink({ externalLinks, type: 'youtube' });
            }
        }

        this._event = {
            genre: formattedGenre,
            url: event.url,
            id: event.id,
            name: event.name,
            links,
            avatarUrl,
            statusCode,
            startDateTime,
        };
    }

    setVenue({ venues }) {
        this._venue = null;
        if (venues && venues.length > 0) {
            const venue = venues[0];
            const { location } = venue;
            if (location) {
                const venueLocation = {
                    lat: +location.latitude,
                    lng: +location.longitude,
                };

                const address = venue.address && venue.address.line1 ? venue.address.line1 : '';
                const city = venue.city && venue.city.name ? venue.city.name : '';
                const country = venue.country && venue.country.name ? venue.country.name : '';
                const upcomingEvents =
                    ((venue.upcomingEvents && venue.upcomingEvents.ticketMaster) || 0) +
                    ((venue.upcomingEvents && venue.upcomingEvents.tmr) || 0);
                const imageUrl =
                    venue.images && venue.images.length > 0
                        ? venue.images[0].url
                        : 'https://s3-ap-southeast-2.amazonaws.com/musicaroundme.io/preview.jpg';

                this._venue = {
                    address,
                    city,
                    country,
                    id: venue.id,
                    imageUrl,
                    url: venue.url,
                    name: venue.name,
                    upcomingEvents,
                    ...venueLocation,
                };
            }
        }
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
