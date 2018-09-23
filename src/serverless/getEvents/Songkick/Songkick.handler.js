const axios = require('axios');
const moment = require('moment');
const { EventWrapper } = require('./Songkick.wrapper');
const { addApiKey, baseUrl, maxPerPage, addPerPage } = require('./Songkick.utils');

const handler = async ({ lat, lng }) => {
    const locationUrl = `${baseUrl}\
/search/locations.json?location=geo:${lat},${lng}\
&${addPerPage(1)}\
&${addApiKey}`;

    const result = await axios({
        method: 'get',
        url: locationUrl,
    });
    if (result.data.resultsPage.totalEntries === 0) {
        return {
            statusCode: 200,
            body: JSON.stringify([]),
        };
    }
    const {
        resultsPage: {
            results: { location },
        },
    } = result.data;
    const metroArea = location[0].metroArea.id;

    const metroAreaUrl = `${baseUrl}\
/metro_areas/${metroArea}/calendar.json?\
${addPerPage(maxPerPage)}\
&${addApiKey}`;

    console.log(metroAreaUrl);

    const resultArea = await axios({
        method: 'get',
        url: metroAreaUrl,
    });
    const resultsEvents = resultArea.data.resultsPage.results.event;
    return Array.isArray(resultsEvents)
        ? resultsEvents
              .filter(item => item.status !== 'cancelled' && item.type !== 'Festival')
              .map(item => {
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
              .filter(item => moment(item.event.startDateTime).isAfter(moment()))
        : [];
};

module.exports = handler;
