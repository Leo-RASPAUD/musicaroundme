const AWS = require('aws-sdk'); // eslint-disable-line
const ticketMasterHandler = require('./Ticketmaster/Ticketmaster.handler');
const ticketMasterUtils = require('./Ticketmaster/Ticketmaster.utils');
const { corsHeaders, getArtists, batchedAsync, removeDuplicates } = require('./utils');

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.getEvents = async event => {
    const {
        queryStringParameters: { lat, lng, venueId, classificationId, month, keyword },
    } = event;
    try {
        const ticketMasterResults = await ticketMasterHandler({
            lat,
            lng,
            venueId,
            classificationId,
            month,
            keyword,
        });
        const noDuplicatesResults = [...new Set(ticketMasterResults.map(item => item.event.name))];

        // Need to do that for every API (limited to 100 by dynamodb)
        const artists = await getArtists({
            client: dynamoClient,
            items: noDuplicatesResults.map(item => ({ id: item })),
        });

        const itemsFound = ticketMasterUtils.getItemsFound({ artists, ticketMasterResults });
        const itemsNotFound = ticketMasterUtils.getItemsNotFound({ artists, ticketMasterResults });

        // Update database
        await batchedAsync({
            list: removeDuplicates(
                itemsNotFound.map(item => ({ id: item.event.name, genre: item.event.genre })),
                'id',
            ),
            client: dynamoClient,
            chunkSize: 25,
            msDelayBetweenChunks: 1000,
        });
        // End for every API

        const finalResults = itemsFound.concat(itemsNotFound);
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(finalResults),
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
