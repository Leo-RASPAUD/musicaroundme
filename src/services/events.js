import httpUtils from 'utils/http.utils';

const BASE_URL = 'https://nilep5ag3l.execute-api.ap-southeast-2.amazonaws.com/PROD';

const getEvents = ({ position, musicApiKey }) =>
    httpUtils.get({
        url: `${BASE_URL}/getEvents?lat=${position.lat}&lng=${position.lng}`,
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getEvents,
};
