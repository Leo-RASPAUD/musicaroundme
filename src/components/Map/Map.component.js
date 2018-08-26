import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import Grid from '@material-ui/core/Grid';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

@withProps(props => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${props.gmapsApiKey}`,
    loadingElement: <Grid item xs={12} sm={9} style={{ height: '85vh' }} />,
    containerElement: <Grid item xs={12} sm={9} style={{ height: '85vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
}))
@withScriptjs
@withGoogleMap
class Map extends React.PureComponent {
    static propTypes = {
        position: PropTypes.object.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
        zoom: PropTypes.number.isRequired,
        getEvents: PropTypes.func.isRequired,
        updateCurrentPosition: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.map = {};
    }

    getEvents = () => {
        const { getEvents, updateCurrentPosition } = this.props;
        const center = JSON.parse(JSON.stringify(this.map.getCenter()));
        const position = {
            lat: center.lat,
            lng: center.lng,
        };
        getEvents({ position });
        updateCurrentPosition({ position });
    };

    onMapMounted = ref => {
        this.map = ref;
    };

    render() {
        const { position, zoom, upcomingEvents } = this.props;
        return (
            <GoogleMap
                center={position}
                zoom={zoom}
                onDragEnd={this.getEvents}
                onZoomChanged={this.getEvents}
                ref={this.onMapMounted}
            >
                {upcomingEvents.map(event => (
                    <Marker key={event.id} position={event.location} />
                ))}
            </GoogleMap>
        );
    }
}

export default Map;
