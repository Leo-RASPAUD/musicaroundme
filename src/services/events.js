import httpUtils from 'utils/http.utils';

const BASE_URL = 'https://nilep5ag3l.execute-api.ap-southeast-2.amazonaws.com/PROD';

const addVenueId = venueId => (venueId ? `&venueId=${venueId}` : '');
const addArtist = artist => (artist ? `&keyword=${artist}` : '');
const addMonth = month => (month ? `&month=${month}` : '');
const addClassificationId = classificationId => {
    if (classificationId) {
        return `&classificationId=${classificationId}`;
    }
    return '';
};

const getEvents = ({ position, musicApiKey, venueId, classificationId, month, artist }) =>
    httpUtils.get({
        url: `${BASE_URL}/events/event?lat=${position.lat}&lng=${position.lng}${addVenueId(
            venueId,
        )}${addClassificationId(classificationId)}${addMonth(month)}${addArtist(artist)}`,
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getEvents,
};
