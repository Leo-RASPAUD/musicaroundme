const geohash = require('ngeohash');
const axios = require('axios');
const {
    addSort,
    addRadius,
    addApiKey,
    addMusicClassification,
    addDefaultSize,
    addVenueId,
    addKeyword,
    addGeoPoint,
    addClassificationId,
    addTimeStamp,
} = require('./Ticketmaster.utils');
const { EventWrapper } = require('./Ticketmaster.wrapper');

const BASE_EVENTS_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

const handler = async ({ lat, lng, venueId, classificationId, month, keyword }) => {
    const url = `${BASE_EVENTS_URL}\
?${addMusicClassification}\
&${addTimeStamp(month)}\
&${addRadius}\
&${addDefaultSize}\
&${addGeoPoint(geohash.encode(lat, lng))}\
&${addApiKey}\
&${addVenueId(venueId)}\
&${addKeyword(keyword)}\
&${addClassificationId(classificationId)}\
&${addSort}`;

    const result = await axios({ method: 'get', url });
    if (result.data.page.totalElements === 0) {
        return [];
    }
    return result.data._embedded.events.map(item => {
        try {
            const wrapped = new EventWrapper(item);
            return {
                event: wrapped.event,
                venue: wrapped.venue,
            };
        } catch (error) {
            console.log('Ticketmaster.handler');
            console.log(error);
            return {};
        }
    });
};

module.exports = handler;
