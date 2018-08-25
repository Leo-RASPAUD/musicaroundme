const axios = require('axios');
const config = require('./config');

const getAuthUrl = url => `${url}apikey=${config.apiKey}`;

const getData = async () => {
    const result = await axios({
        method: 'get',
        url: getAuthUrl('https://api.songkick.com/api/3.0/metro_areas/26794/calendar.json?'),
    });
    console.log(result.data);
};

getData();
