import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

@withScriptjs
@withGoogleMap
class Home extends React.PureComponent {
    static propTypes = {
        position: PropTypes.object.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
        zoom: PropTypes.number.isRequired,
    };

    render() {
        const { position, zoom, upcomingEvents } = this.props;
        return (
            <GoogleMap center={position} zoom={zoom}>
                {upcomingEvents.map(event => (
                    <Marker key={event.id} position={event.location} />
                ))}
            </GoogleMap>
        );
    }
}

export default Home;
