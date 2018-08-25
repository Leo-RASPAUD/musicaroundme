const axios = require('axios');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

module.exports.getLocalisation = async () => {
    try {
        const result = await axios({
            method: 'get',
            url: `http://api.ipstack.com/check?access_key=${process.env.API_KEY}`,
        });
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
