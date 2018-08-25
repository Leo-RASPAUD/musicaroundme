import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppToolbar from './AppToolbar.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AppToolbar),
);
