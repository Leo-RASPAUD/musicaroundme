import cssConstants from 'constants/css.constants';

export default theme => ({
    root: {
        height: 100,
        flex: 1,
        ...cssConstants.overflow.auto,
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
    expanded: {
        margin: 0,
    },
    chip: {
        paddingRight: '0 !important',
    },
    panelRoot: {
        padding: `0 ${2 * theme.spacing.unit}px`,
    },
    noEvents: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        ...cssConstants.flexDirection.column,
        margin: 2 * theme.spacing.unit,
    },
    noEventsText: {
        marginTop: 2 * theme.spacing.unit,
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
