import cssConstants from 'constants/css.constants';

export default () => ({
    ticketmasterLogo: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.justifyContent.center,
        transform: 'scale(0.25)',
    },
    events: {
        height: 'calc(100vh - 64px - 35px)',
        ...cssConstants.overflow.hidden,
    },
});
