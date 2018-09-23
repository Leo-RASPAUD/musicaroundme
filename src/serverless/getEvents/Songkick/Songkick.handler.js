const axios = require('axios');
const { EventWrapper } = require('./Songkick.wrapper');
const {
    addApiKey,
    baseUrl,
    maxPerPage,
    addPerPage,
    addLocation,
    addTypeConcert,
    addKeyword,
    removeCancelled,
    addTimestamp,
} = require('./Songkick.utils');

const handler = async ({ lat, lng, keyword, month }) => {
    const eventsUrl = `${baseUrl}/events.json\
?${addLocation({ lat, lng })}\
&${addPerPage(maxPerPage)}\
&${addTypeConcert}\
&${addKeyword(keyword)}\
&${addTimestamp(month)}\
&${addApiKey}`;

    console.log(eventsUrl);

    const results = await axios({
        method: 'get',
        url: eventsUrl,
    });
    const resultsEvents = results.data.resultsPage.results.event;
    return !Array.isArray(resultsEvents)
        ? []
        : resultsEvents.filter(removeCancelled).map(item => {
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
          });
};

module.exports = handler;
