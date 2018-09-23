import httpUtils from 'utils/http.utils';
import serverlessUtils from 'utils/serverless';

const getClassifications = ({ musicApiKey }) =>
    httpUtils.get({
        url: `${serverlessUtils.config.baseUrl}/classifications`,
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getClassifications,
};
