import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GetCurrentInformation from 'components/GetCurrentInformation/GetCurrentInformation.component';
import EventsAndMap from 'components/EventsAndMap/EventsAndMap.component';
import styles from './Home.styles';

const Home = props => {
    const { classes, getCurrentPosition, currentPosition } = props;
    const isCurrentPosition = Object.keys(currentPosition).length > 0;
    return (
        <div className={classes.root}>
            {!isCurrentPosition && (
                <GetCurrentInformation getCurrentPosition={getCurrentPosition} />
            )}
            {isCurrentPosition && <EventsAndMap currentPosition={currentPosition} />}
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    getCurrentPosition: PropTypes.func.isRequired,
    currentPosition: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
