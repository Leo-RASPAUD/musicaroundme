const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const writeItems = async ({ chunk, chunks, client }) => {
    const { UnprocessedItems } = await client
        .batchWrite({
            RequestItems: {
                ArtistsMusicAroundMe: chunk.map(item => ({ PutRequest: { Item: item } })),
            },
        })
        .promise();
    if (UnprocessedItems.length) {
        chunks.push(UnprocessedItems);
    }
};

/* eslint-disable no-await-in-loop */
const batchedAsync = async ({ client, list, chunkSize = 10, msDelayBetweenChunks = 0 }) => {
    console.log(`${list.length} items to create or update`);
    const emptyList = new Array(Math.ceil(list.length / chunkSize)).fill();
    const clonedList = list.slice(0);
    const chunks = emptyList.map(() => clonedList.splice(0, chunkSize));
    for (let i = 0; i < chunks.length; i += 1) {
        const chunk = chunks[i];
        if (msDelayBetweenChunks) {
            await new Promise(resolve => setTimeout(resolve, msDelayBetweenChunks));
        }
        await writeItems({ client, chunk, chunks });
    }
};

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

const removeNull = item => item;

module.exports = {
    corsHeaders,
    batchedAsync,
    writeItems,
    getArtists,
    removeDuplicates,
    removeNull,
};
