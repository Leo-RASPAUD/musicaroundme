import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, CardContent, CardMedia, IconButton, Tooltip } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import styles from './VenueInfo.styles';

const VenueInfo = props => {
    const { venue, classes } = props;
    const { details, events } = venue;
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                className={classes.media}
                height="100"
                image={details.imageUrl}
                title={details.name}
            />
            <CardContent>
                <div className={classes.title}>
                    <Typography variant="subheading">{details.name}</Typography>
                    <Tooltip title="Website">
                        <IconButton
                            size="small"
                            color="primary"
                            className={classes.icon}
                            onClick={() => window.open(details.url)}
                        >
                            <Home />
                        </IconButton>
                    </Tooltip>
                </div>
                <Typography variant="caption">{details.city}</Typography>
                <Typography variant="caption">{details.address}</Typography>
                <div>
                    {events.map(event => (
                        <div className={classes.details} key={event.id}>
                            <Typography>{event.name}</Typography>
                            <Typography variant="caption">
                                {event.startDateTime === 'Unknown'
                                    ? event.startDateTime
                                    : moment(event.startDateTime).format('Do MMMM YYYY, HH:mm')}
                            </Typography>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

VenueInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    venue: PropTypes.object.isRequired,
};

export default withStyles(styles)(VenueInfo);
