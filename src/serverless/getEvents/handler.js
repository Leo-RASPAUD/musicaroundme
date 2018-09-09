const axios = require('axios');
const geohash = require('ngeohash');
const moment = require('moment');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const BASE_EVENTS_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const DEFAULT_SIZE = 200;
const DEFAULT_RADIUS = 20;

const addSort = 'sort=date,asc';
const addRadius = `radius=${DEFAULT_RADIUS}&unit=km`;
const addApiKey = `apikey=${process.env.API_KEY}`;
const addMusicClassification = 'classificationName=music';
const addDefaultSize = `size=${DEFAULT_SIZE}`;
const addVenueId = venueId => (venueId ? `&venueId=${venueId}` : '');
const addGeoPoint = geoPoint => `geoPoint=${geoPoint}`;

const addClassificationId = classificationId => {
    if (classificationId) {
        return `&classificationId=${classificationId}`;
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

module.exports.getEvents = async event => {
    const {
        queryStringParameters: { lat, lng, venueId, classificationId, month },
    } = event;
    try {
        const url = `${BASE_EVENTS_URL}?${addMusicClassification}&${addTimeStamp(
            month,
        )}&${addRadius}&${addDefaultSize}&${addGeoPoint(
            geohash.encode(lat, lng),
        )}&${addApiKey}${addVenueId(venueId)}${addClassificationId(classificationId)}&${addSort}`;
        const result = await axios({
            method: 'get',
            url,
        });

        if (result.data.page.totalElements === 0) {
            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify([]),
            };
        }
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(result.data._embedded.events),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify(error),
        };
    }
};
