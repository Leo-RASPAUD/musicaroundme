const moment = require('moment');

const maxPerPage = 50; // Max for songkick
const addApiKey = `apikey=${process.env.SONGKICK_API_KEY}`;
const addTypeConcert = 'type=Concert';
const baseUrl = 'https://api.songkick.com/api/3.0';
const addLocation = ({ lat, lng }) => `location=geo:${lat},${lng}`;
const addPerPage = value => `per_page=${value}`;
const removeCancelled = item => item.status !== 'cancelled';
const addKeyword = keyword => (keyword ? `artist_name=${keyword}` : '');
const addTimestamp = month => {
    const min = month ? moment(month, 'MMMM').startOf('month') : moment();
    const max = month
        ? moment(month, 'MMMM').endOf('month')
        : moment()
              .add(1, 'y')
              .endOf('month');
    return `min_date=${min.format('YYYY-MM-DD')}&max_date=${max.format('YYYY-MM-DD')}`;
};

module.exports = {
    addTimestamp,
    addKeyword,
    addLocation,
    removeCancelled,
    addApiKey,
    addPerPage,
    addTypeConcert,
    baseUrl,
    maxPerPage,
};
