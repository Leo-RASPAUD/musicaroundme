import cssConstants from 'constants/css.constants';

const styles = theme => ({
    root: {
        background: '#f6f6f6',
        height: 'auto',
        minHeight: '100%',
        ...cssConstants.display.flex,
        ...cssConstants.flexDirection.column,
    },
    loadingBar: {
        height: 2,
        position: 'absolute',
        backgroundColor: theme.palette.secondary.main,
    },
});

export default styles;
