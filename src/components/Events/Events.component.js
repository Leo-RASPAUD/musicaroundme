import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Facebook } from 'react-content-loader';
import utils from 'utils/event.utils';
import styles from './Events.styles';

const { formatEvents } = utils;

const Events = props => {
    const { classes, upcomingEvents, loading, zoomOnEvent } = props;
    const events = formatEvents(upcomingEvents);
    return (
        <div className={classes.root}>
            {loading.length > 0 && <Facebook />}
            {loading.length === 0 && upcomingEvents.length === 0 && <div>No events</div>}
            {loading.length === 0 &&
                events.length > 0 &&
                events.map(event => (
                    <Paper
                        key={event.id}
                        className={classes.item}
                        onClick={() =>
                            zoomOnEvent({
                                position: { lat: event.lat, lng: event.lng },
                                zoom: 16,
                                event,
                            })
                        }
                    >
                        <Typography>{event.name}</Typography>
                        <Typography>{event.classifications[0].genre.name}</Typography>
                        <Typography>{event._embedded.venues[0].name}</Typography>
                        <Typography>
                            {event.dates.start.localDate} - {event.dates.start.localTime}
                        </Typography>
                    </Paper>
                ))}
        </div>
    );
};

Events.propTypes = {
    classes: PropTypes.object.isRequired,
    zoomOnEvent: PropTypes.func.isRequired,
    loading: PropTypes.array.isRequired,
    upcomingEvents: PropTypes.array.isRequired,
};

export default withStyles(styles)(Events);
