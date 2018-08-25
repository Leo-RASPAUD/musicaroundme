import axios from 'axios';

const post = async ({ url, params }) => axios.post(url, params);
const get = async ({ url }) => axios.get(url);

export default {
    post,
    get,
};
