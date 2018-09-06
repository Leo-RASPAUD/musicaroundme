import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Events from 'components/Events/Events.component';
import actions from 'actions/Events.actions';

const mapStateToProps = state => ({
    loading: state.events.loading,
    upcomingEvents: state.events.upcomingEvents,
    position: state.map.currentPosition,
});

const mapDispatchToProps = dispatch => ({
    getEvents: ({ position }) => dispatch(actions.getEvents({ position })),
    zoomOnEvent: ({ position, zoom, event }) =>
        dispatch(actions.zoomOnEvent({ position, zoom, event })),
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
        zoomOnEvent: PropTypes.func.isRequired,
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
        const { upcomingEvents, loading, zoomOnEvent } = this.props;
        return (
            <Events loading={loading} upcomingEvents={upcomingEvents} zoomOnEvent={zoomOnEvent} />
        );
    }
}

export default EventsContainer;
