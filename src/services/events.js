import httpUtils from 'utils/http.utils';
import serverlessUtils from 'utils/serverless';

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
        url: `${serverlessUtils.config.baseUrl}/events/event?lat=${position.lat}&lng=${
            position.lng
        }${addVenueId(venueId)}${addClassificationId(classificationId)}${addMonth(
            month,
        )}${addArtist(artist)}`,
        headers: {
            'x-api-key': musicApiKey,
        },
    });

export default {
    getEvents,
};
