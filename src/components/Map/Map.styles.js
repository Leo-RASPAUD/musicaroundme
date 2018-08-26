import cssConstants from 'constants/css.constants';

export default () => ({
    gpsButton: {
        marginRight: 11,
        padding: 8,
        minWidth: 0,
        userSelect: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
        borderRadius: 2,
        ...cssConstants.cursor.pointer,
        color: '#2196F3',
        backgroundColor: 'rgb(255, 255, 255)',
        transition: 'all 0.15s ease-in-out',
        '&:hover': {
            color: '#3f51b5',
            backgroundColor: 'rgb(255, 255, 255) !important',
        },
    },
    search: {
        boxSizing: 'border-box',
        border: '1px solid transparent',
        width: 350,
        height: 32,
        margin: 20,
        padding: '0 12px',
        borderRadius: 3,
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
        fontSize: '14px',
        outline: 'none',
        textOverflow: 'ellipses',
    },
});
