import cssConstants from 'constants/css.constants';

export default theme => ({
    root: {
        padding: '2vh 5vw',
        height: '100%',
    },
    header: {
        ...cssConstants.display.flex,
        ...cssConstants.alignItems.center,
        marginBottom: 3 * theme.spacing.unit,
    },
});
