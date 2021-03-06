const moment = require('moment');

const removeNull = item => item;
const mapNameEvent = item => item.event.name;

const getArtists = async ({ client, items }) => {
    const params = {
        RequestItems: {
            ArtistsMusicAroundMe: {
                Keys: items,
            },
        },
    };
    const results = await client.batchGet(params).promise();
    return results.Responses.ArtistsMusicAroundMe;
};

const removeDuplicates = (arr, prop) => {
    const obj = {};
    for (let i = 0, len = arr.length; i < len; i += 1) {
        if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
    }
    return Object.keys(obj).map(key => obj[key]);
};

const isEventAlreadyInList = ({ list, element }) => {
    const currentEventName = element.event.name;
    const currentVenueName = element.venue.name;
    const currentDate = moment(element.event.startDateTime);
    return list.findIndex(item => {
        const sameDate = moment(item.event.startDateTime).isSame(currentDate);
        const sameName = item.event.name === currentEventName;
        const sameVenue = item.venue.name === currentVenueName;
        return sameDate && (sameName || sameVenue);
    });
};

const cleanUp = arr => {
    const finalList = [];
    for (let i = 0, len = arr.length; i < len; i += 1) {
        const element = arr[i];
        const index = isEventAlreadyInList({ list: finalList, element });
        if (index === -1) {
            finalList.push(element);
        } else if (index > -1 && !finalList[index].event.avatarUrl) {
            finalList.splice(index, 1);
            finalList.push(element);
        }
    }

    return finalList;
};

const getItemsFound = ({ artists, items }) =>
    items
        .map(item => {
            const fromDb = artists.find(artist => artist.id === item.event.name);
            return fromDb ? { ...item, event: { ...item.event, genre: fromDb.genre } } : null;
        })
        .filter(removeNull);

const getItemsNotFound = ({ artists, items }) =>
    items
        .map(item => {
            const fromDb = artists.find(artist => artist.id === item.event.name);
            return !fromDb || (fromDb.genre === 'Unknown' && item.genre)
                ? { ...item, event: { ...item.event, genre: item.event.genre || 'Unknown' } }
                : null;
        })
        .filter(removeNull);

const sortByDate = (a, b) => {
    const now = moment();
    const momentA =
        a.event.startDateTime !== 'Unknown' ? moment(a.event.startDateTime) : now.startOf('day');
    const momentB =
        b.event.startDateTime !== 'Unknown' ? moment(b.event.startDateTime) : now.endOf('day');
    if (momentA.isBefore(momentB)) return -1;
    if (momentA.isAfter(momentB)) return 1;
    return 0;
};

module.exports = {
    cleanUp,
    getItemsFound,
    getItemsNotFound,
    getArtists,
    removeDuplicates,
    removeNull,
    mapNameEvent,
    sortByDate,
};
