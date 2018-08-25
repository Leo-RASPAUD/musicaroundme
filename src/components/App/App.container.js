import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(App),
);
