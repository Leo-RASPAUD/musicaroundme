import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Events from 'components/Events/Events.component';
import actions from 'actions/Events.actions';
import venuesActions from 'actions/Venues.actions';

const mapStateToProps = state => ({
    loading: state.events.loading,
    upcomingEvents: state.events.upcomingEvents,
    position: state.map.currentPosition,
});

const mapDispatchToProps = dispatch => ({
    getEvents: ({ position, venueId }) => dispatch(actions.getEvents({ position, venueId })),
    selectEvent: ({ eventId }) => dispatch(actions.selectEvent({ eventId })),
    zoomOnVenue: ({ position, zoom, venueId }) =>
        dispatch(venuesActions.zoomOnVenue({ position, zoom, venueId })),
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
        zoomOnVenue: PropTypes.func.isRequired,
        selectEvent: PropTypes.func.isRequired,
        loading: PropTypes.array.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
    };

    componentDidMount = () => {
        const {
            props: { getEvents, position },
        } = this;
        getEvents({ position });
    };

    render() {
        const {
            upcomingEvents,
            loading,
            zoomOnVenue,
            selectEvent,
            getEvents,
            position,
        } = this.props;
        return (
            <Events
                loading={loading}
                upcomingEvents={upcomingEvents}
                zoomOnVenue={zoomOnVenue}
                selectEvent={selectEvent}
                getEvents={getEvents}
                position={position}
            />
        );
    }
}

export default EventsContainer;
