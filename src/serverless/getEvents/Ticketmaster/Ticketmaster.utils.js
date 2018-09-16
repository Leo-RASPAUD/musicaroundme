const moment = require('moment');
const { removeNull } = require('../utils');

const DEFAULT_SIZE = 100;
const DEFAULT_RADIUS = 20;

const addSort = 'sort=date,asc';
const addRadius = `radius=${DEFAULT_RADIUS}&unit=km`;
const addApiKey = `apikey=${process.env.TICKETMASTER_API_KEY}`;
const addMusicClassification = 'classificationName=music';
const addDefaultSize = `size=${DEFAULT_SIZE}`;
const addVenueId = venueId => (venueId ? `venueId=${venueId}` : '');
const addKeyword = keyword => (keyword ? `keyword=${keyword}` : '');
const addGeoPoint = geoPoint => `geoPoint=${geoPoint}`;

const addClassificationId = classificationId => {
    if (classificationId) {
        return `classificationId=${classificationId}`;
    }
    return '';
};

const addTimeStamp = month => {
    let startDateTime = moment()
        .toISOString()
        .substr(0, 19);

    let endDateTime = moment()
        .endOf('month')
        .toISOString()
        .substr(0, 19);

    if (month) {
        const currentMonth = moment().month();
        const currentYear = moment().year();
        const newMonth = moment(month, 'MMMM').month();
        if (currentMonth === newMonth) {
            return `startDateTime=${startDateTime}Z&endDateTime=${endDateTime}Z`;
        }
        if (newMonth < currentMonth) {
            startDateTime = moment(`${month}-${+currentYear + 1}`, 'MMMM-YYYY')
                .toISOString()
                .substr(0, 19);
            endDateTime = moment(`${month}-${+currentYear + 1}`, 'MMMM-YYYY')
                .endOf('month')
                .toISOString()
                .substr(0, 19);
            return `startDateTime=${startDateTime}Z&endDateTime=${endDateTime}Z`;
        }
        startDateTime = moment(month, 'MMMM')
            .toISOString()
            .substr(0, 19);
        endDateTime = moment(month, 'MMMM')
            .endOf('month')
            .toISOString()
            .substr(0, 19);
        return `startDateTime=${startDateTime}Z&endDateTime=${endDateTime}Z`;
    }
    return `startDateTime=${startDateTime}Z`;
};

const getItemsFound = ({ artists, ticketMasterResults }) =>
    ticketMasterResults
        .map(item => {
            const fromDb = artists.find(artist => artist.id === item.event.name);
            return fromDb ? { ...item, event: { ...item.event, genre: fromDb.genre } } : null;
        })
        .filter(removeNull);

const getItemsNotFound = ({ artists, ticketMasterResults }) =>
    ticketMasterResults
        .map(item => {
            const fromDb = artists.find(artist => artist.id === item.event.name);
            return !fromDb || (fromDb.genre === 'Unknown' && item.genre)
                ? { ...item, event: { ...item.event, genre: item.event.genre || 'Unknown' } }
                : null;
        })
        .filter(removeNull);

module.exports = {
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
    getItemsFound,
    getItemsNotFound,
};
