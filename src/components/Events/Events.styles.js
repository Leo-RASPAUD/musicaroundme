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
    avatar: {
        ...cssConstants.display.flex,
    },
    avatarDetails: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        marginLeft: theme.spacing.unit,
        flex: 1,
    },
    panel: {
        margin: theme.spacing.unit,
    },
    chip: {
        paddingRight: '0 !important',
    },
    panelRoot: {
        padding: `0 ${2 * theme.spacing.unit}px`,
    },
});
