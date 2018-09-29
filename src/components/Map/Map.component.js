import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GpsFixed from '@material-ui/icons/GpsFixed';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import MapControlCurrentPosition from 'components/MapControlCurrentPosition/MapControlCurrentPosition.component';
import VenueMarkers from 'components/VenueMarkers/VenueMarkers.component';
import styles from './Map.styles';

const defaultOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
};

const getPosition = position => JSON.parse(JSON.stringify(position));

@withProps(props => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
        props.gmapsApiKey
    }&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: 'calc(100vh - 64px - 35px)' }} />,
    containerElement: <div style={{ height: 'calc(100vh - 64px - 35px)' }} />,
    mapElement: <div style={{ height: '100%' }} />,
}))
@withScriptjs
@withGoogleMap
@withStyles(styles)
class Map extends React.PureComponent {
    static propTypes = {
        position: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        zoom: PropTypes.number.isRequired,
        getCurrentPosition: PropTypes.func.isRequired,
        updateCurrentPosition: PropTypes.func.isRequired,
        onDragEnd: PropTypes.func.isRequired,
        zoomOnVenue: PropTypes.func.isRequired,
        venues: PropTypes.array.isRequired,
    };

    constructor() {
        super();
        this.map = {};
        this.searchBox = {};
    }

    onMapMounted = ref => {
        this.map = ref;
    };

    onSearchBoxMounted = ref => {
        this.searchBox = ref;
    };

    onPlacesChanged = () => {
        const { updateCurrentPosition } = this.props;
        const places = this.searchBox.getPlaces();
        updateCurrentPosition({ position: getPosition(places[0].geometry.location) });
    };

    render() {
        const {
            classes,
            position,
            zoom,
            venues,
            getCurrentPosition,
            onDragEnd,
            zoomOnVenue,
        } = this.props;
        return (
            <GoogleMap
                center={position}
                zoom={zoom}
                options={defaultOptions}
                onDragEnd={() => onDragEnd({ center: getPosition(this.map.getCenter()) })}
                onBoundsChanged={this.onBoundsChanged}
                ref={this.onMapMounted}
            >
                <MapControlCurrentPosition position={google.maps.ControlPosition.RIGHT_BOTTOM}>
                    <Button className={classes.gpsButton} onClick={getCurrentPosition}>
                        <GpsFixed />
                    </Button>
                </MapControlCurrentPosition>
                <SearchBox
                    controlPosition={google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={this.onPlacesChanged}
                    ref={this.onSearchBoxMounted}
                >
                    <input
                        type="text"
                        placeholder="Search location..."
                        className={classes.search}
                    />
                </SearchBox>
                <VenueMarkers venues={venues} zoomOnVenue={zoomOnVenue} />
            </GoogleMap>
        );
    }
}

export default Map;
