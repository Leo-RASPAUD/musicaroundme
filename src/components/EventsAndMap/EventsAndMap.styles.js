import cssConstants from 'constants/css.constants';

export default () => ({
    ticketmasterLogo: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.justifyContent.center,
        transform: 'scale(0.25)',
    },
    events: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
});
