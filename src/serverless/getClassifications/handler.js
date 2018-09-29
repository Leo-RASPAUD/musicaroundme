const axios = require('axios');
const AWS = require('aws-sdk');
const moment = require('moment');
const { corsHeaders } = require('../utils/http.utils');
const { batchedAsync } = require('../utils/db.utils');

const BASE_EVENTS_URL =
    'https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ';

const addApiKey = `apikey=${process.env.TICKETMASTER_API_KEY}`;

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getClassifications = async () => {
    const params = {
        TableName: 'GenresMusicAroundMe',
    };

    let shouldGetData = false;
    const now = moment();

    try {
        const dbResult = await documentClient.scan(params).promise();
        if (
            dbResult.Items.length === 0 ||
            moment(dbResult.Items[0].updatedOn)
                .add(1, 'd')
                .isBefore(now)
        ) {
            shouldGetData = true;
        }

        if (!shouldGetData) {
            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify(dbResult.Items),
            };
        }

        const url = `${BASE_EVENTS_URL}?${addApiKey}`;
        const result = await axios({
            method: 'get',
            url,
        });
        const { genres } = result.data.segment._embedded;
        const allGenres = [].concat(
            ...genres.map(genre => ({
                name: genre.name === 'Undefined' ? 'Unknown' : genre.name,
                id: genre.id,
                updatedOn: now.toISOString(),
            })),
        );

        await batchedAsync({
            list: allGenres,
            client: documentClient,
            chunkSize: 25,
            msDelayBetweenChunks: 1000,
            table: 'GenresMusicAroundMe',
        });

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
