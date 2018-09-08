const axios = require('axios');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const BASE_EVENTS_URL =
    'https://app.ticketmaster.com/discovery/v2/classifications.json?id=KZFzniwnSyZfZ7v7nJ';

const addApiKey = `apikey=${process.env.API_KEY}`;
module.exports.getClassifications = async () => {
    try {
        const url = `${BASE_EVENTS_URL}&${addApiKey}`;
        const result = await axios({
            method: 'get',
            url,
        });
        const { genres } = result.data._embedded.classifications[0].segment._embedded;
        const allGenres = [].concat(
            ...genres.map(genre => ({
                name: genre.name,
                id: genre.id,
            })),
        );

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(allGenres),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify(error),
        };
    }
};
