const AWS = require('aws-sdk'); // eslint-disable-line
const ticketMasterHandler = require('./Ticketmaster/Ticketmaster.handler');
const songkickHandler = require('./Songkick/Songkick.handler');
const { corsHeaders } = require('../utils/http.utils');
const {
    getArtists,
    batchedAsync,
    removeDuplicates,
    mapNameEvent,
    getItemsFound,
    getItemsNotFound,
    sortByDate,
    cleanUp,
} = require('./utils');

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.getEvents = async event => {
    const {
        queryStringParameters: { lat, lng, venueId, classificationId, month, keyword, genre },
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
        const songkickResults = await songkickHandler({ lat, lng, keyword, month, genre });

        const noDuplicatesResults = [
            ...new Set(
                ticketMasterResults.map(mapNameEvent).concat(songkickResults.map(mapNameEvent)),
            ),
        ];
        let finalResults = [];

        // Limited to 100 by dynamodb, for now ok since we're doing 50 + 50
        if (noDuplicatesResults.length > 0) {
            const artists = await getArtists({
                client: dynamoClient,
                items: noDuplicatesResults.map(item => ({ id: item })),
            });

            const itemsFound = getItemsFound({ artists, items: ticketMasterResults }).concat(
                getItemsFound({ artists, items: songkickResults }),
            );
            const itemsNotFound = getItemsNotFound({ artists, items: ticketMasterResults }).concat(
                getItemsNotFound({ artists, items: songkickResults }),
            );

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
            // End limit 50
            finalResults = cleanUp(itemsFound.concat(itemsNotFound))
                .sort(sortByDate)
                .filter(item => {
                    console.log(genre, item.event, item.event ? item.event.genre : '');
                    if (genre) {
                        return (
                            item.event.genre === 'Undefined' ||
                            (item.event.genre &&
                                item.event.genre.toLowerCase() === genre.toLowerCase())
                        );
                    }
                    return true;
                });
        }

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
