import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Map from 'components/Map/Map.component';
import Events from 'components/Events/Events.container';
import { Button, Typography } from '@material-ui/core';

import styles from './Home.styles';

@withStyles(styles)
class Home extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        currentPosition: PropTypes.object.isRequired,
        zoom: PropTypes.number.isRequired,
        getCurrentPosition: PropTypes.func.isRequired,
        gmapsApiKey: PropTypes.string.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
    };

    render() {
        const {
            classes,
            currentPosition,
            getCurrentPosition,
            gmapsApiKey,
            upcomingEvents,
            zoom,
        } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography variant="subheading">Home</Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={getCurrentPosition}
                        style={{ marginLeft: 50 }}
                    >
                        Get position
                    </Button>
                </div>
                <div className={classes.content}>
                    <Map
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${gmapsApiKey}`}
                        loadingElement={<div style={{ height: '100%', width: '75vw' }} />}
                        containerElement={
                            <div style={{ height: '85vh', width: '75vw', flexGrow: 1 }} />
                        }
                        mapElement={<div style={{ height: '100%' }} />}
                        position={currentPosition}
                        upcomingEvents={upcomingEvents}
                        zoom={zoom}
                    />
                    <Events position={currentPosition} />
                </div>
            </div>
        );
    }
}

export default Home;
