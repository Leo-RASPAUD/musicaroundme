const maxPerPage = 50; // Max for songkick
const addApiKey = `apikey=${process.env.SONGKICK_API_KEY}`;
const baseUrl = 'https://api.songkick.com/api/3.0';
const addPerPage = value => `per_page=${value}`;

module.exports = {
    addApiKey,
    addPerPage,
    baseUrl,
    maxPerPage,
};
