import cssConstants from 'constants/css.constants';

export default theme => ({
    root: {
        paddingTop: '2vh',
        height: '100%',
        flex: 1,
    },
    header: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.flexDirection.column,
        marginBottom: 3 * theme.spacing.unit,
    },
    grow: {
        flexGrow: 1,
    },
});
