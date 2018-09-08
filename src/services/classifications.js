import httpUtils from 'utils/http.utils';

const BASE_URL = 'https://nilep5ag3l.execute-api.ap-southeast-2.amazonaws.com/PROD';

const getClassifications = ({ musicApiKey }) =>
    httpUtils.get({
        url: `${BASE_URL}/classifications`,
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getClassifications,
};
