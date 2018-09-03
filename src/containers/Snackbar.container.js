import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import actions from 'actions/Snackbar.actions';
import Snackbar from '@material-ui/core/Snackbar';
import { red, orange, green } from '@material-ui/core/colors';
import snackbarTypes from 'utils/snackbarTypes';

const getStyle = snackbarType => {
    let color = green;
    if (snackbarType === snackbarTypes.ERROR) color = red;
    if (snackbarType === snackbarTypes.WARN) color = orange;
    return color[500];
};

const mapStateToProps = state => ({
    isSnackbarDisplayed: state.app.isSnackbarDisplayed,
    message: state.app.snackbarMessage,
    snackbarColor: getStyle(state.app.snackbarType),
    snackbarDuration: state.app.snackbarDuration,
});

const mapDispatchToProps = dispatch => ({
    closeSnackbar: () => dispatch(actions.closeSnackbar()),
});

@withRouter
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class App extends React.PureComponent {
    static propTypes = {
        isSnackbarDisplayed: PropTypes.bool.isRequired,
        closeSnackbar: PropTypes.func.isRequired,
        message: PropTypes.string.isRequired,
        snackbarColor: PropTypes.string.isRequired,
        snackbarDuration: PropTypes.number.isRequired,
    };

    render() {
        const {
            snackbarColor,
            isSnackbarDisplayed,
            closeSnackbar,
            message,
            snackbarDuration,
        } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={isSnackbarDisplayed}
                onClose={closeSnackbar}
                autoHideDuration={snackbarDuration}
                message={message}
                ContentProps={{
                    style: {
                        backgroundColor: snackbarColor,
                    },
                }}
            />
        );
    }
}

export default App;
