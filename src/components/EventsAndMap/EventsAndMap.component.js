import React from 'react';
import PropTypes from 'prop-types';
import Map from 'containers/Map.container';
import Events from 'containers/Events.container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './EventsAndMap.styles';

const EventsAndMap = props => {
    const { classes, currentPosition } = props;
    return (
        <Grid container className={classes.root} spacing={16}>
            <Map />
            <Grid item xs={12} sm={3}>
                <Events position={currentPosition} />
            </Grid>
        </Grid>
    );
};

EventsAndMap.propTypes = {
    classes: PropTypes.object.isRequired,
    currentPosition: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsAndMap);
