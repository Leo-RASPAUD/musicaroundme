import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MusicAroundMe from 'components/MusicAroundMe/MusicAroundMe.component';

import actions from 'actions/App.actions';

const mapStateToProps = state => ({
    isLoadingConfiguration: state.app.isLoadingConfiguration,
});

const mapDispatchToProps = dispatch => ({
    getConfiguration: () => dispatch(actions.getConfiguration()),
});

@withRouter
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class App extends React.PureComponent {
    static propTypes = {
        isLoadingConfiguration: PropTypes.bool.isRequired,
        getConfiguration: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        const { getConfiguration } = this.props;
        getConfiguration();
    };

    render() {
        const { isLoadingConfiguration } = this.props;
        return <MusicAroundMe isLoadingConfiguration={isLoadingConfiguration} />;
    }
}

export default App;
