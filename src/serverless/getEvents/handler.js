const axios = require('axios');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const BASE_EVENTS_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const DEFAULT_SIZE = 100;

const addApiKey = `apikey=${process.env.API_KEY}`;
const addMusicClassification = 'classificationName=music';
const addDefaultSize = `size=${DEFAULT_SIZE}`;
const addTimeStamp = () => {
    const date = new Date();
    return `startDateTime=${date.toISOString().substr(0, 19)}Z`;
};

module.exports.getEvents = async event => {
    const {
        queryStringParameters: { lat, lng },
    } = event;
    try {
        const result = await axios({
            method: 'get',
            url: `${BASE_EVENTS_URL}?${addMusicClassification}&${addTimeStamp()}&${addDefaultSize}&latlong=${lat},${lng}&${addApiKey}`,
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
