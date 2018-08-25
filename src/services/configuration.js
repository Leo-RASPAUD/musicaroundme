import httpUtils from 'utils/http.utils';

const getConfiguration = () =>
    httpUtils.get({
        url: 'https://mzgp1rff79.execute-api.ap-southeast-2.amazonaws.com/prod/configuration',
    });

const getLocalisation = ({ musicApiKey }) =>
    httpUtils.get({
        url: 'https://nilep5ag3l.execute-api.ap-southeast-2.amazonaws.com/PROD/getLocalisation',
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getConfiguration,
    getLocalisation,
};
