import httpUtils from 'utils/http.utils';

const getInformation = ({ artists }) =>
    artists.map(artist =>
        httpUtils.get({
            url: `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,
        }),
    );

export default {
    getInformation,
};
