import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import mapActions from 'actions/Map.actions';
import GetCurrentInformation from 'components/GetCurrentInformation/GetCurrentInformation.component';

const mapDispatchToProps = dispatch => ({
    getCurrentPosition: () => dispatch(mapActions.getCurrentPosition({ redirectToHome: true })),
});

@withRouter
@connect(
    null,
    mapDispatchToProps,
)
class HomeContainer extends React.PureComponent {
    static propTypes = {
        getCurrentPosition: PropTypes.func.isRequired,
    };

    render() {
        const { getCurrentPosition } = this.props;
        return <GetCurrentInformation getCurrentPosition={getCurrentPosition} />;
    }
}

export default HomeContainer;
