import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App.component';
import actions from './App.actions';

const mapStateToProps = state => ({
    isLoadingConfiguration: state.app.isLoadingConfiguration,
});

const mapDispatchToProps = dispatch => ({
    getConfiguration: () => dispatch(actions.getConfiguration()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(App),
);
