import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

@withScriptjs
@withGoogleMap
class Home extends React.PureComponent {
    static propTypes = {
        position: PropTypes.object.isRequired,
        zoom: PropTypes.number,
    };

    static defaultProps = {
        zoom: 13,
    };

    render() {
        const { position, zoom } = this.props;
        return (
            <GoogleMap center={position} defaultZoom={zoom}>
                <Marker position={position} />
            </GoogleMap>
        );
    }
}

export default Home;
