const moment = require('moment');

const maxPerPage = 50; // Max for songkick
const addApiKey = `apikey=${process.env.SONGKICK_API_KEY}`;
const addTypeConcert = 'type=Concert';
const baseUrl = 'https://api.songkick.com/api/3.0';
const addLocation = ({ lat, lng }) => `location=geo:${lat},${lng}`;
const addPerPage = value => `per_page=${value}`;
const removeCancelled = item => item.status !== 'cancelled';
const removePastEvents = item => moment(item.event.startDateTime).isAfter(moment());

module.exports = {
    addLocation,
    removeCancelled,
    addApiKey,
    addPerPage,
    addTypeConcert,
    baseUrl,
    maxPerPage,
    removePastEvents,
};
