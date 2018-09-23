import cssConstants from 'constants/css.constants';

export default theme => ({
    root: {
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: '100%',
    },
    avatar: {
        ...cssConstants.display.flex,
    },
    expandIconWrapper: {
        ...cssConstants.display.flex,
        ...cssConstants.justifyContent.flexEnd,
    },
    contentWrapper: {
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
    panelWrapper: {
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
        flex: 1,
        padding: '0 !important',
    },
    expandIcon: {
        opacity: 0.75,
        color: theme.palette.primary.main,
    },
});
