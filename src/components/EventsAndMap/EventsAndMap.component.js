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
        <div className={classes.root}>
            <Grid container spacing={0} className={classes.flex1}>
                <Grid item xs={12} sm={3} className={classes.flexColumn}>
                    <Events />
                </Grid>
                <Grid item xs={12} sm={9} className={classes.flexColumn}>
                    <Map />
                </Grid>
            </Grid>
            <div className={classes.footer}>
                Powered by
                <img
                    alt="ticketmasterLogo"
                    src="https://s3-ap-southeast-2.amazonaws.com/musicaroundme.io/ticketmaster.png"
                />
            </div>
        </div>
    );
};

EventsAndMap.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsAndMap);
