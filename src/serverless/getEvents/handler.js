const axios = require('axios');
const geohash = require('ngeohash');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const BASE_EVENTS_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const DEFAULT_SIZE = 200;
const DEFAULT_RADIUS = 20;

const addRadius = `radius=${DEFAULT_RADIUS}&unit=km`;
const addApiKey = `apikey=${process.env.API_KEY}`;
const addMusicClassification = 'classificationName=music';
const addDefaultSize = `size=${DEFAULT_SIZE}`;
const addGeoPoint = geoPoint => `geoPoint=${geoPoint}`;
const addTimeStamp = () => {
    const date = new Date();
    return `startDateTime=${date.toISOString().substr(0, 19)}Z`;
};

module.exports.getEvents = async event => {
    const {
        queryStringParameters: { lat, lng },
    } = event;
    try {
        const url = `${BASE_EVENTS_URL}?${addMusicClassification}&${addTimeStamp()}&${addRadius}&${addDefaultSize}&${addGeoPoint(
            geohash.encode(lat, lng),
        )}&${addApiKey}`;
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
