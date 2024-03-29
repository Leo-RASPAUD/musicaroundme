import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { GpsFixed } from '@material-ui/icons';
import styles from './GetCurrentInformation.styles';

const GetCurrentInformation = props => {
    const { classes, getCurrentPosition } = props;
    return (
        <div className={classes.header}>
            <Typography variant="subheading" className={classes.text}>
                First we need to get your position!
            </Typography>
            <Button variant="outlined" color="primary" onClick={getCurrentPosition}>
                <GpsFixed className={classes.gpsIcon} />
                Get position
            </Button>
        </div>
    );
};

GetCurrentInformation.propTypes = {
    classes: PropTypes.object.isRequired,
    getCurrentPosition: PropTypes.func.isRequired,
};

export default withStyles(styles)(GetCurrentInformation);
