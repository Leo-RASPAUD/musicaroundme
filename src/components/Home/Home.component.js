import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Map from 'components/Map/Map.component';
import { Button } from '@material-ui/core';

import styles from './Home.styles';

@withStyles(styles)
class Home extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        currentPosition: PropTypes.object.isRequired,
        getCurrentPosition: PropTypes.func.isRequired,
        gmapsApiKey: PropTypes.string.isRequired,
    };

    render() {
        const { classes, currentPosition, getCurrentPosition, gmapsApiKey } = this.props;
        return (
            <div className={classes.root}>
                <div>Home</div>
                <Button onClick={getCurrentPosition}>Get position</Button>
                <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${gmapsApiKey}&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '85vh' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    position={currentPosition}
                />
            </div>
        );
    }
}

export default Home;
