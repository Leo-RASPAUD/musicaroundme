import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import snackbarTypes from 'utils/snackbarTypes';
import styles from './Snackbar.style';

const getClass = (snackbarType, classes) => {
    if (snackbarType === snackbarTypes.ERROR) return classes.error;
    if (snackbarType === snackbarTypes.WARN) return classes.warn;
    if (snackbarType === snackbarTypes.SUCCESS) return classes.success;
    return classes.root;
};

const snackbarParams = {
    vertical: 'bottom',
    horizontal: 'right',
};

@withStyles(styles)
class SnackbarComponent extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isSnackbarDisplayed: PropTypes.bool.isRequired,
        closeSnackbar: PropTypes.func.isRequired,
        message: PropTypes.string.isRequired,
        snackbarType: PropTypes.string.isRequired,
        snackbarDuration: PropTypes.number.isRequired,
    };

    render() {
        const {
            isSnackbarDisplayed,
            closeSnackbar,
            message,
            snackbarType,
            classes,
            snackbarDuration,
        } = this.props;
        const snackbarClass = getClass(snackbarType, classes);
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: snackbarParams.vertical,
                    horizontal: snackbarParams.horizontal,
                }}
                open={isSnackbarDisplayed}
                onClose={closeSnackbar}
                autoHideDuration={snackbarDuration}
                ContentProps={{
                    classes: {
                        root: snackbarClass,
                    },
                }}
                message={message}
            />
        );
    }
}

export default SnackbarComponent;
