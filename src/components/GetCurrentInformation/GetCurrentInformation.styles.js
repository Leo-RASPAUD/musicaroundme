import cssConstants from 'constants/css.constants';

export default theme => ({
    header: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.flexDirection.column,
        marginBottom: 3 * theme.spacing.unit,
        paddingTop: 3 * theme.spacing.unit,
    },
});