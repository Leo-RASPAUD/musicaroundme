import moment from 'moment';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const addYear = year => ` (${+year + 1})`;

const getMonths = () => {
    const now = moment().month();
    const currentYear = moment().year();
    const newMonths = [];
    for (let i = 0; i < months.length; i += 1) {
        const monthIndex = (now + i) % 12;
        newMonths.push(`${months[monthIndex]}${now + i >= 12 ? addYear(currentYear) : ''}`);
    }
    return newMonths;
};

export default {
    getMonths,
};
