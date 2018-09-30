import cssConstants from 'constants/css.constants';

export default () => ({
    footer: {
        transform: 'scale(0.25)',
        height: 35,
    },
    events: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
    map: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        ...cssConstants.position.relative,
    },
    root: {
        flex: 1,
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
    flex1: {
        flex: 1,
    },
});
