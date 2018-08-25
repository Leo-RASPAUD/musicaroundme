import httpUtils from 'utils/http.utils';

const SLACK_HOOK = 'https://hooks.slack.com/services/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';

const defaultFields = message => [{ title: 'Information', value: message }];

const post = async ({ message, fields }) => {
    const channel = '#events';
    const body = {
        channel,
        attachments: [
            {
                color: '4CAF50',
                pretext: `*${message}*`,
                fields: fields || defaultFields(message),
            },
        ],
    };
    return httpUtils.post({
        url: SLACK_HOOK,
        params: JSON.stringify(body),
    });
};

export default {
    post,
};
