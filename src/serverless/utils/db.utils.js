const writeItems = async ({ chunk, chunks, client, table }) => {
    const { UnprocessedItems } = await client
        .batchWrite({
            RequestItems: {
                [table]: chunk.map(item => ({ PutRequest: { Item: item } })),
            },
        })
        .promise();
    if (UnprocessedItems.length) {
        chunks.push(UnprocessedItems);
    }
};

/* eslint-disable no-await-in-loop */
const batchedAsync = async ({ client, list, chunkSize = 10, msDelayBetweenChunks = 0, table }) => {
    console.log(`${list.length} items to create or update`);
    const emptyList = new Array(Math.ceil(list.length / chunkSize)).fill();
    const clonedList = list.slice(0);
    const chunks = emptyList.map(() => clonedList.splice(0, chunkSize));
    for (let i = 0; i < chunks.length; i += 1) {
        const chunk = chunks[i];
        if (msDelayBetweenChunks) {
            await new Promise(resolve => setTimeout(resolve, msDelayBetweenChunks));
        }
        await writeItems({ client, chunk, chunks, table });
    }
};

module.exports = {
    batchedAsync,
};
