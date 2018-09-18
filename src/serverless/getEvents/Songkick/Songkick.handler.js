const axios = require('axios');
const { EventWrapper } = require('./Songkick.wrapper');

const getAuthUrl = ({ url }) => `${url}&apikey=${process.env.SONGKICK_API_KEY}`;
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const DEFAULT_SIZE = 50; // Max for songkick

const handler = async ({ lat, lng }) => {
    const result = await axios({
        method: 'get',
        url: getAuthUrl({
            url: `https://api.songkick.com/api/3.0/search/locations.json?location=geo:${lat},${lng}&per_page=1`,
        }),
    });
    if (result.data.resultsPage.totalEntries === 0) {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify([]),
        };
    }
    const {
        resultsPage: {
            results: { location },
        },
    } = result.data;
    const metroArea = location[0].metroArea.id;
    const resultArea = await axios({
        method: 'get',
        url: getAuthUrl({
            url: `https://api.songkick.com/api/3.0/metro_areas/${metroArea}/calendar.json?per_page=${DEFAULT_SIZE}`,
        }),
    });
    const resultsEvents = resultArea.data.resultsPage.results.event;
    return Array.isArray(resultsEvents)
        ? resultsEvents.filter(item => item.status !== 'cancelled').map(item => {
              try {
                  const wrapped = new EventWrapper(item);
                  return {
                      event: wrapped.event,
                      venue: wrapped.venue,
                  };
              } catch (error) {
                  console.log('Songkick.handler');
                  console.log(error);
                  return {};
              }
          })
        : [];
};

module.exports = handler;
