import cssConstants from 'constants/css.constants';

export default theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        padding: 2 * theme.spacing.unit,
    },
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
        flex: 1,
    },
    artistTextField: {
        flex: 1,
        padding: 2 * theme.spacing.unit,
        margin: theme.spacing.unit,
        borderRadius: 0.5 * theme.spacing.unit,
        border: 'none',
        outline: 'none',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    search: {
        ...cssConstants.textAlign.center,
        padding: 2 * theme.spacing.unit,
    },
    gridIcons: {
        display: 'flex',
        alignItems: 'center',
    },
    artist: {
        ...cssConstants.position.relative,
        ...cssConstants.display.flex,
    },
    searchArtist: {
        ...cssConstants.display.flex,
        ...cssConstants.position.absolute,
        top: 16,
        right: theme.spacing.unit,
    },
    searchArtistIcon: {
        padding: 2,
        opacity: 0.85,
        ...cssConstants.cursor.pointer,
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
    },
    white: {
        color: 'white !important',
    },
});
