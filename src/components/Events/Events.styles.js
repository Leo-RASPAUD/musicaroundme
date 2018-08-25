import cssConstants from 'constants/css.constants';

export default () => ({
    root: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        flex: 1,
        ...cssConstants.overflow.auto,
        maxHeight: '85vh',
    },
    item: {
        margin: 10,
        padding: 10,
    },
});
