import axios from 'axios';

const post = async ({ url, params }) => axios.post(url, params);

export default {
    post,
};
