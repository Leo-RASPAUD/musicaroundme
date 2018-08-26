import cssConstants from 'constants/css.constants';

export default theme => ({
    root: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        flex: 1,
        ...cssConstants.overflow.auto,
        maxHeight: '95vh',
        paddingTop: 2 * theme.spacing.unit,
    },
    item: {
        margin: 10,
        padding: 10,
    },
});
