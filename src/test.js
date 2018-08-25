const axios = require('axios');
const express = require('express'); // eslint-disable-line

const app = express();

const getAuthUrl = url => `${url}apikey=jjTwg0sS5Y4glVjE`;

const getData = async (req, res) => {
    const { lat, lng } = req.query;
    const result = await axios({
        method: 'get',
        url: getAuthUrl(
            `https://api.songkick.com/api/3.0/search/locations.json?location=geo:${lat},${lng}&per_page=1&`,
        ),
    });
    const {
        resultsPage: {
            results: { location },
        },
    } = result.data;
    const metroArea = location[0].metroArea.id;
    const resultArea = await axios({
        method: 'get',
        url: getAuthUrl(`https://api.songkick.com/api/3.0/metro_areas/${metroArea}/calendar.json?`),
    });
    res.send(resultArea.data);
};

app.get('/events', getData);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
