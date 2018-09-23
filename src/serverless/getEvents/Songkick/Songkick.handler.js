const axios = require('axios');
const { EventWrapper } = require('./Songkick.wrapper');
const {
    addApiKey,
    baseUrl,
    maxPerPage,
    addPerPage,
    addLocation,
    addTypeConcert,
    removePastEvents,
    removeCancelled,
} = require('./Songkick.utils');

const handler = async ({ lat, lng }) => {
    const eventsUrl = `${baseUrl}/events.json\
?${addLocation({ lat, lng })}\
&${addPerPage(maxPerPage)}\
&${addTypeConcert}\
&${addApiKey}`;

    console.log(eventsUrl);

    const results = await axios({
        method: 'get',
        url: eventsUrl,
    });
    const resultsEvents = results.data.resultsPage.results.event;
    return resultsEvents
        .filter(removeCancelled)
        .map(item => {
            try {
                const wrapped = new EventWrapper(item);
                console.log(item, wrapped);
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
        .filter(removePastEvents);
};

module.exports = handler;
