import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, CardContent, CardMedia, IconButton, Tooltip } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from './VenueInfo.styles';

const VenueInfo = props => {
    const { venue, classes } = props;
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                className={classes.media}
                height="100"
                image={
                    venue.images
                        ? venue.images[0].url
                        : 'https://source.unsplash.com/300x100/?music'
                }
                title={venue.name}
            />
            <CardContent>
                <div className={classes.title}>
                    <Typography variant="subheading">{venue.name}</Typography>
                    <Tooltip title="Website">
                        <IconButton
                            size="small"
                            color="primary"
                            className={classes.icon}
                            onClick={() => window.open(venue.url)}
                        >
                            <Home />
                        </IconButton>
                    </Tooltip>
                </div>
                <Typography variant="subheading" color="primary">
                    {venue.upcomingEvents.ticketmaster} upcoming events
                </Typography>
                <Typography variant="caption">{venue.city.name}</Typography>
                <Typography variant="caption">{venue.address.line1}</Typography>
            </CardContent>
        </Card>
    );
};

VenueInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    venue: PropTypes.object.isRequired,
};

export default withStyles(styles)(VenueInfo);
