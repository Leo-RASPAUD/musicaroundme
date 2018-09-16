const ticketMasterHandler = require('./Ticketmaster/Ticketmaster.handler');
const { corsHeaders } = require('./utils');

module.exports.getEvents = async event => {
    const {
        queryStringParameters: { lat, lng, venueId, classificationId, month, keyword },
    } = event;
    try {
        const result = await ticketMasterHandler({
            lat,
            lng,
            venueId,
            classificationId,
            month,
            keyword,
        });
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(result),
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
