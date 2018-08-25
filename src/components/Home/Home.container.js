import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Home),
);
