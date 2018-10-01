/* eslint-disable max-len */

const imageUrl = 'https://s3-ap-southeast-2.amazonaws.com/musicaroundme.io/thumbnail.jpg';
const titleDescription = 'Music around me in a blink of an eye';
const descriptionText =
    'MusicAroundMe.io is a website allowing you to see in a blink of an eye all the concerts next to you. Aggregating data from multiple APIs you can now filter and search specific bands or musical genres without having to login to any website or subscribe to any newsletter!';

const description = {
    name: 'description',
    content: descriptionText,
};

const keyWords = {
    name: 'keywords',
    content: 'Music api concert live events concerts artificial intelligence ai',
};

const applicationName = {
    name: 'application-name',
    content: 'MusicAroundMe.io',
};

const openGraph = {
    image: {
        property: 'og:image',
        content: imageUrl,
    },
    title: {
        property: 'og:title',
        content: `MusicAroundMe.io - ${titleDescription}`,
    },
    description: {
        property: 'og:description',
        content: descriptionText,
    },
    type: {
        property: 'og:type',
        content: 'image.jpg',
    },
};

module.exports = {
    description,
    openGraph,
    keyWords,
    applicationName,
};
