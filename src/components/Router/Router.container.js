import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Router from './Router.component';

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(Router));
