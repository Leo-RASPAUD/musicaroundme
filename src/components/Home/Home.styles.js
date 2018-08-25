import cssConstants from 'constants/css.constants';

export default theme => ({
    root: {
        paddingTop: '2vh',
        height: '100%',
    },
    header: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        marginBottom: 3 * theme.spacing.unit,
    },
    content: {
        ...cssConstants.display.flex,
    },
    grow: {
        flexGrow: 1,
    },
});
