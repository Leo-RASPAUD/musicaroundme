import cssConstants from 'constants/css.constants';

export default () => ({
    root: {
        height: '100%',
        flex: 1,
    },
    ticketmasterLogo: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.justifyContent.center,
        transform: 'scale(0.5)',
    },
});
