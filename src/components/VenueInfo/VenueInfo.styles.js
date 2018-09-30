import cssConstants from 'constants/css.constants';

export default theme => ({
    media: {
        objectFit: 'cover',
        width: '50vw',
        maxWidth: '400px !important',
    },
    title: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.justifyContent.spaceBetween,
    },
    icon: {
        marginLeft: theme.spacing.unit,
    },
    card: {
        ...cssConstants.cursor.default,
        ...cssConstants.position.absolute,
        width: '50vw',
        maxWidth: '400px !important',
        top: 2 * theme.spacing.unit,
        right: 2 * theme.spacing.unit,
    },
    details: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.justifyContent.spaceBetween,
    },
});
