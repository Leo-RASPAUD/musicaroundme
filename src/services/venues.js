import httpUtils from 'utils/http.utils';

const BASE_URL = 'https://nilep5ag3l.execute-api.ap-southeast-2.amazonaws.com/PROD';

const getVenue = ({ venueId, musicApiKey }) =>
    httpUtils.get({
        url: `${BASE_URL}/venue/${venueId}`,
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getVenue,
};
