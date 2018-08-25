import httpUtils from 'utils/http.utils';

const getConfiguration = () =>
    httpUtils.get({
        url: 'https://mzgp1rff79.execute-api.ap-southeast-2.amazonaws.com/prod/configuration',
    });

const getLocalisation = ({ apiKey }) =>
    httpUtils.get({
        url: `http://api.ipstack.com/check?access_key=${apiKey}`,
    });

export default {
    getConfiguration,
    getLocalisation,
};
