import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Facebook } from 'react-content-loader';

import styles from './Events.styles';

@withStyles(styles)
class Events extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        position: PropTypes.object.isRequired,
        getEvents: PropTypes.func.isRequired,
        updateCurrentPosition: PropTypes.func.isRequired,
        loading: PropTypes.array.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        const { getEvents, position } = props;
        getEvents({ position });
    }

    componentDidUpdate = prevProps => {
        const { position, getEvents } = this.props;
        const { lat, lng } = position;
        if (prevProps.position.lat !== lat || prevProps.position.lng !== lng) {
            getEvents({ position });
        }
    };

    render() {
        const { classes, upcomingEvents, loading, updateCurrentPosition } = this.props;
        return (
            <div className={classes.root}>
                {loading.length > 0 && <Facebook />}
                {loading.length === 0 && upcomingEvents.length === 0 && <div>No events</div>}
                {loading.length === 0 &&
                    upcomingEvents.length > 0 &&
                    upcomingEvents.map((event, index) => (
                        <Paper
                            key={event.id}
                            className={classes.item}
                            onClick={() =>
                                updateCurrentPosition({
                                    position: { lat: event.location.lat, lng: event.location.lng },
                                })
                            }
                        >
                            <Typography>{index}</Typography>
                            <Typography>{event.displayName}</Typography>
                        </Paper>
                    ))}
            </div>
        );
    }
}

export default Events;
