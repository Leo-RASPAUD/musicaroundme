import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Facebook } from 'react-content-loader';

import styles from './Events.styles';

const Events = props => {
    const { classes, upcomingEvents, loading, updateCurrentPosition } = props;
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
};

Events.propTypes = {
    classes: PropTypes.object.isRequired,
    updateCurrentPosition: PropTypes.func.isRequired,
    loading: PropTypes.array.isRequired,
    upcomingEvents: PropTypes.array.isRequired,
};

export default withStyles(styles)(Events);
