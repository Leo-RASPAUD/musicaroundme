export default {
    icon: {
        marginRight: 10,
    },
    headerText: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 15,
        borderBottom: '1px solid rgba(0,0,0,0.25)',
    },
    smallButton: {
        padding: 2,
        minWidth: 25,
        width: 25,
        margin: 4,
        height: 25,
        minHeight: 26,
    },
    hoverTableBackground: theme => ({
        transition: 'background-color 0.25s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.primary[50],
        },
    }),
    buttonBackgroundColor: {
        backgroundColor: '#2a2b31',
    },
    overflow: {
        auto: {
            overflow: 'auto',
        },
        hidden: {
            overflow: 'hidden',
        },
        visible: {
            overflow: 'visible',
        },
        scroll: {
            overflow: 'scroll',
        },
    },
    flexWrap: {
        wrap: {
            flexWrap: 'wrap',
        },
    },
    textTransform: {
        initial: {
            textTransform: 'initial',
        },
    },
    cursor: {
        pointer: {
            cursor: 'pointer',
        },
        default: {
            cursor: 'default',
        },
        notAllowed: {
            cursor: 'not-allowed',
        },
    },
    position: {
        relative: {
            position: 'relative',
        },
        absolute: {
            position: 'absolute',
        },
    },
    display: {
        flex: {
            display: 'flex',
        },
        block: {
            display: 'block',
        },
        inlineFlex: {
            display: 'inline-flex',
        },
        inline: {
            display: 'inline',
        },
        inlineBlock: {
            display: 'inline-block',
        },
    },
    flexDirection: {
        row: {
            flexDirection: 'row',
        },
        column: {
            flexDirection: 'column',
        },
    },
    alignItems: {
        stretch: {
            alignItems: 'stretch',
        },
        center: {
            alignItems: 'center',
        },
        flexStart: {
            alignItems: 'flex-start',
        },
        flexEnd: {
            alignItems: 'flex-end',
        },
        baseline: {
            alignItems: 'baseline',
        },
        start: {
            alignItems: 'start',
        },
    },
    justifyContent: {
        center: {
            justifyContent: 'center',
        },
        flexStart: {
            justifyContent: 'flex-start',
        },
        flexEnd: {
            justifyContent: 'flex-end',
        },
        spaceBetween: {
            justifyContent: 'space-between',
        },
        spaceAround: {
            justifyContent: 'space-around',
        },
        spaceEvenly: {
            justifyContent: 'space-evenly',
        },
    },
    textAlign: {
        center: {
            textAlign: 'center',
        },
        left: {
            textAlign: 'left',
        },
        right: {
            textAlign: 'right',
        },
        justify: {
            textAlign: 'justify',
        },
    },
    pointerEvent: {
        none: {
            pointerEvents: 'none',
        },
    },
    width: {
        auto: {
            width: 'auto',
        },
    },
    userSelect: {
        none: {
            userSelect: 'none',
        },
    },
};
