import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Events from 'components/Events/Events.component';
import actions from 'actions/Events.actions';
import MapActions from 'actions/Map.actions';

const mapStateToProps = state => ({
    loading: state.events.loading,
    upcomingEvents: state.events.upcomingEvents,
});

const mapDispatchToProps = dispatch => ({
    getEvents: ({ position }) => dispatch(actions.getEvents({ position })),
    updateCurrentPosition: ({ position }) =>
        dispatch(MapActions.updateCurrentPosition({ position })),
});

@withRouter
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class EventsContainer extends React.PureComponent {
    static propTypes = {
        position: PropTypes.object.isRequired,
        getEvents: PropTypes.func.isRequired,
        updateCurrentPosition: PropTypes.func.isRequired,
        loading: PropTypes.array.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
    };

    componentDidMount = () => {
        const {
            props: { getEvents, position },
        } = this;
        getEvents({ position });
    };

    componentDidUpdate = prevProps => {
        const {
            props: { position, getEvents },
        } = this;
        const { lat, lng } = position;

        if (prevProps.position.lat !== lat || prevProps.position.lng !== lng) {
            getEvents({ position });
        }
    };

    render() {
        const { upcomingEvents, loading, updateCurrentPosition } = this.props;
        return (
            <Events
                loading={loading}
                upcomingEvents={upcomingEvents}
                updateCurrentPosition={updateCurrentPosition}
            />
        );
    }
}

export default EventsContainer;
