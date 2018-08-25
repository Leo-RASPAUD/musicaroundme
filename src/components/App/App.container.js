import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App.component';
import actions from './App.actions';

const mapStateToProps = state => ({
    isLoadingConfiguration: state.app.isLoadingConfiguration,
    isLoadingLocalisation: state.app.isLoadingLocalisation,
});

const mapDispatchToProps = dispatch => ({
    getConfiguration: () => dispatch(actions.getConfiguration()),
    getLocalisation: () => dispatch(actions.getLocalisation()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(App),
);
