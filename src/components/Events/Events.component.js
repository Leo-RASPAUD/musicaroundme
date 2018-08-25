import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Facebook } from 'react-content-loader';

import styles from './Events.styles';

@withStyles(styles)
class Events extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        position: PropTypes.object.isRequired,
        getEvents: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        const { getEvents, position } = props;
        getEvents({ position });
    }

    componentDidUpdate = prevProps => {
        const { position, getEvents } = this.props;
        const { lat, lng } = position;
        if (prevProps.position.lat !== lat || prevProps.position.lng !== lng) {
            getEvents({ position });
        }
    };

    render() {
        const { classes, upcomingEvents, loading } = this.props;
        return (
            <div className={classes.root}>
                {loading && <Facebook />}
                {!loading &&
                    upcomingEvents.map(event => (
                        <Paper key={event.id} className={classes.item}>
                            {event.displayName}
                        </Paper>
                    ))}
            </div>
        );
    }
}

export default Events;
