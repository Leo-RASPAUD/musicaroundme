const axios = require('axios');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const BASE_EVENTS_URL = 'https://app.ticketmaster.com/discovery/v2/venues';

const addApiKey = `apikey=${process.env.API_KEY}`;

module.exports.getVenue = async event => {
    const { pathParameters } = event;
    const { venueId } = pathParameters;
    try {
        const url = `${BASE_EVENTS_URL}/${venueId}?${addApiKey}`;
        const result = await axios({
            method: 'get',
            url,
        });

        if (!result.data) {
            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({}),
            };
        }
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(result.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify(error),
        };
    }
};
