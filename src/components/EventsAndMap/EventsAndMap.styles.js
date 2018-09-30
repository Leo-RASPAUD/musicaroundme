import cssConstants from 'constants/css.constants';

export default () => ({
    footer: {
        transform: 'scale(0.25)',
        height: 35,
    },
    flexColumn: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
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
