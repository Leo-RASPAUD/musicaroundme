const AWS = require('aws-sdk');
const { corsHeaders } = require('../utils/http.utils');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getConfiguration = async () => {
    const params = {
        TableName: 'ConfigurationMusicAroundMe',
    };

    try {
        const result = await documentClient.scan(params).promise();
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(result.Items),
        };
    } catch (error) {
        return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify(error),
        };
    }
};
