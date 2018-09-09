import cssConstants from 'constants/css.constants';

export default theme => ({
    root: {
        ...cssConstants.overflow.auto,
        maxHeight: '100%',
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
