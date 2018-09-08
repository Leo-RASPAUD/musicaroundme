import httpUtils from 'utils/http.utils';

const BASE_URL = 'https://nilep5ag3l.execute-api.ap-southeast-2.amazonaws.com/PROD';

const addVenueId = venueId => (venueId ? `&venueId=${venueId}` : '');
const addClassificationId = classificationId => {
    if (classificationId) {
        return `&classificationId=${classificationId}`;
    }
    return '';
};

const getEvents = ({ position, musicApiKey, venueId, classificationId }) =>
    httpUtils.get({
        url: `${BASE_URL}/events/event?lat=${position.lat}&lng=${position.lng}${addVenueId(
            venueId,
        )}${addClassificationId(classificationId)}`,
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getEvents,
};
