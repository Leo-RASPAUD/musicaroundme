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
        width: 300,
    },
});
