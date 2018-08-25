import axios from 'axios';

const post = async ({ url, params }) => axios.post(url, params);
const get = async ({ url, headers }) =>
    axios({
        method: 'get',
        url,
        headers: headers || {},
    });

export default {
    post,
    get,
};
