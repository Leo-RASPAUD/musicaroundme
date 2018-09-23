import httpUtils from 'utils/http.utils';
import serverlessUtils from 'utils/serverless';

const getConfiguration = () =>
    httpUtils.get({
        url: `${serverlessUtils.config.baseUrl}/configuration`,
    });

const getLocalisation = ({ musicApiKey }) =>
    httpUtils.get({
        url: `${serverlessUtils.config.baseUrl}/getLocalisation`,
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getConfiguration,
    getLocalisation,
};
