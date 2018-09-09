import cssConstants from 'constants/css.constants';

export default theme => ({
    media: {
        objectFit: 'cover',
        width: 300,
    },
    title: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
    },
    icon: {
        marginLeft: theme.spacing.unit,
    },
    card: {
        ...cssConstants.cursor.default,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    root: {
        paddingTop: theme.spacing.unit,
    },
    search: {
        ...cssConstants.textAlign.center,
        padding: theme.spacing.unit,
    },
});
