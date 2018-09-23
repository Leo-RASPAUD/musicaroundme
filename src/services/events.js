import httpUtils from 'utils/http.utils';
import serverlessUtils from 'utils/serverless';

const addVenueId = venueId => (venueId ? `venueId=${venueId}` : '');
const addArtist = artist => (artist ? `keyword=${artist}` : '');
const addMonth = month => (month ? `month=${month}` : '');
const addGenre = genre => (genre ? `genre=${genre}` : '');
const addClassificationId = classificationId => {
    if (classificationId) {
        return `&classificationId=${classificationId}&genre=`;
    }
    return '';
};

const getEvents = ({ position, musicApiKey, venueId, classificationId, month, artist, genre }) => {
    const url = `${serverlessUtils.config.baseUrl}/events/event?\
lat=${position.lat}\
&lng=${position.lng}\
&${addVenueId(venueId)}\
&${addClassificationId(classificationId)}\
&${addMonth(month)}\
&${addArtist(artist)}\
&${addGenre(genre)}`;

    return httpUtils.get({
        url,
        headers: {
            'x-api-key': musicApiKey,
        },
    });
};

export default {
    getEvents,
};
