import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actions from './Snackbar.actions';
import SnackbarComponent from './Snackbar.component';

const mapStateToProps = state => ({
    isSnackbarDisplayed: state.app.isSnackbarDisplayed,
    message: state.app.snackbarMessage,
    snackbarType: state.app.snackbarType,
    snackbarDuration: state.app.snackbarDuration,
});

const mapDispatchToProps = dispatch => ({
    closeSnackbar: () => dispatch(actions.closeSnackbar()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(SnackbarComponent),
);
