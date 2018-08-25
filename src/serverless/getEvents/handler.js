const axios = require('axios');

const getAuthUrl = ({ url }) => `${url}apikey=${process.env.API_KEY}`;
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

module.exports.getEvents = async event => {
    const {
        queryStringParameters: { lat, lng },
    } = event;
    try {
        const result = await axios({
            method: 'get',
            url: getAuthUrl({
                url: `https://api.songkick.com/api/3.0/search/locations.json?location=geo:${lat},${lng}&per_page=1&`,
            }),
        });
        const {
            resultsPage: {
                results: { location },
            },
        } = result.data;
        const metroArea = location[0].metroArea.id;
        const resultArea = await axios({
            method: 'get',
            url: getAuthUrl({
                url: `https://api.songkick.com/api/3.0/metro_areas/${metroArea}/calendar.json?`,
            }),
        });
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(resultArea.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify(error),
        };
    }
};
