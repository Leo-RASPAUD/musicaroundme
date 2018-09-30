import React from 'react';
import VenueInfo from 'components/VenueInfo/VenueInfo.component';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    venue: state.venues.items.find(venue => venue.selected),
});

@withRouter
@connect(
    mapStateToProps,
    null,
)
class VenueInfoContainer extends React.PureComponent {
    static propTypes = {
        venue: PropTypes.object,
    };

    static defaultProps = {
        venue: null,
    };

    render() {
        const { venue } = this.props;
        if (venue) {
            return <VenueInfo venue={venue} />;
        }
        return null;
    }
}

export default VenueInfoContainer;
