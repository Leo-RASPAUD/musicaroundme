import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Map from 'components/Map/Map.container';
import Events from 'containers/Events.container';
import { Button, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import styles from './Home.styles';

@withStyles(styles)
class Home extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        getCurrentPosition: PropTypes.func.isRequired,
        currentPosition: PropTypes.object.isRequired,
    };

    render() {
        const { classes, getCurrentPosition, currentPosition } = this.props;
        const isCurrentPosition = Object.keys(currentPosition).length > 0;
        return (
            <div className={classes.root}>
                {!isCurrentPosition && (
                    <div className={classes.header}>
                        <Typography variant="subheading">
                            First we need to get your position!
                        </Typography>
                        <Button variant="outlined" color="primary" onClick={getCurrentPosition}>
                            Get position
                        </Button>
                    </div>
                )}
                {isCurrentPosition && (
                    <Grid container className={classes.root} spacing={16}>
                        <Map />
                        <Grid item xs={12} sm={3}>
                            <Events position={currentPosition} />
                        </Grid>
                    </Grid>
                )}
            </div>
        );
    }
}

export default Home;
