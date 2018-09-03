const styles = theme => ({
    loadingBar: {
        position: 'absolute',
        height: 2,
        zIndex: 10,
        backgroundColor: theme.palette.secondary.main,
        opacity: '0.75 !important',
    },
    toolbar: {
        boxShadow: 'initial',
        backgroundColor: 'white',
        color: 'white',
    },
    border: {
        top: 64,
        backgroundColor: '#2b36414f',
        width: '100%',
        height: 1,
        opacity: 0.15,
        position: 'fixed',
    },
});

export default styles;
