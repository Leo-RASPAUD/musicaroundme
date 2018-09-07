import React from 'react';
import PropTypes from 'prop-types';
import Map from 'containers/Map.container';
import Events from 'containers/Events.container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from './EventsAndMap.styles';

const EventsAndMap = props => {
    const { classes } = props;
    return (
        <Grid container className={classes.root} spacing={16}>
            <Map />
            <Grid item xs={6} sm={3}>
                <Events />
            </Grid>
            <Grid item xs={12} className={classes.ticketmasterLogo}>
                Powered by
                <img
                    alt="ticketmasterLogo"
                    src="https://s3-ap-southeast-2.amazonaws.com/musicaroundme.io/ticketmaster.png"
                />
            </Grid>
        </Grid>
    );
};

EventsAndMap.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsAndMap);
