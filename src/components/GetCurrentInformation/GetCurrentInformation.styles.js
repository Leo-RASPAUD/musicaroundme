import cssConstants from 'constants/css.constants';

export default theme => ({
    header: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.flexDirection.column,
        paddingTop: 3 * theme.spacing.unit,
    },
    text: {
        paddingBottom: 2 * theme.spacing.unit,
    },
    gpsIcon: {
        marginRight: theme.spacing.unit,
    },
});
