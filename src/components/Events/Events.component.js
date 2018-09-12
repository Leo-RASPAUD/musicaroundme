import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    Avatar,
    Chip,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import { Home, ExpandMore, ExpandLess } from '@material-ui/icons';
import { Facebook } from 'react-content-loader';
import { FaTicketAlt, FaWikipediaW, FaYoutube, FaFacebookF } from 'react-icons/fa';
import SearchOptions from 'containers/SearchOptions.container';
import styles from './Events.styles';

const Events = props => {
    const { classes, upcomingEvents, loading, zoomOnVenue, selectEvent } = props;
    const events = upcomingEvents.filter(event => event.statusCode !== 'cancelled');
    return (
        <div className={classes.root}>
            <SearchOptions />
            {loading.length > 0 && <Facebook />}
            {loading.length === 0 && upcomingEvents.length === 0 && <div>No events</div>}
            {loading.length === 0 &&
                events.length > 0 &&
                events.map(item => {
                    const { event } = item;
                    const { venue } = item;
                    return (
                        <ExpansionPanel
                            key={event.id}
                            onClick={() => {
                                zoomOnVenue({
                                    position: { lat: venue.lat, lng: venue.lng },
                                    zoom: 16,
                                    venueId: venue.id,
                                });
                                selectEvent({ eventId: event.id });
                            }}
                            className={classes.panel}
                            expanded={event.selected}
                        >
                            <ExpansionPanelSummary classes={{ root: classes.panelRoot }}>
                                <div className={classes.panelWrapper}>
                                    <div className={classes.contentWrapper}>
                                        <Avatar
                                            alt={event.name}
                                            src={event.avatarUrl}
                                            className={classes.avatar}
                                        />
                                        <div className={classes.avatarDetails}>
                                            <Typography variant="subheading">
                                                {event.name}
                                            </Typography>
                                            <Typography variant="caption">
                                                {event.startDateTime}
                                            </Typography>
                                            <Typography variant="caption">{venue.name}</Typography>
                                        </div>
                                        {
                                            <Chip
                                                className={classes.chip}
                                                label={event.genre}
                                                color="primary"
                                                variant="outlined"
                                            />
                                        }
                                    </div>
                                    <div className={classes.expandIconWrapper}>
                                        {!item.selected && (
                                            <ExpandMore className={classes.expandIcon} />
                                        )}
                                        {item.selected && (
                                            <ExpandLess className={classes.expandIcon} />
                                        )}
                                    </div>
                                </div>
                            </ExpansionPanelSummary>
                            {item.selected && (
                                <ExpansionPanelDetails>
                                    <Tooltip title="Homepage">
                                        <div>
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!event.links.homepage}
                                                onClick={() => window.open(event.links.homepage)}
                                            >
                                                <Home className={classes.linkIcon} />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Buy tickets">
                                        <div>
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!event.url}
                                                onClick={() => window.open(event.url)}
                                            >
                                                <FaTicketAlt className={classes.linkIcon} />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Facebook">
                                        <div>
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!event.links.facebook}
                                                onClick={() => window.open(event.links.facebook)}
                                            >
                                                <FaFacebookF className={classes.linkIcon} />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Youtube">
                                        <div>
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!event.links.youtube}
                                                onClick={() => window.open(event.links.youtube)}
                                            >
                                                <FaYoutube className={classes.linkIcon} />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Wikipedia">
                                        <div>
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!event.links.wiki}
                                                onClick={() => window.open(event.links.wiki)}
                                            >
                                                <FaWikipediaW className={classes.linkIcon} />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                </ExpansionPanelDetails>
                            )}
                        </ExpansionPanel>
                    );
                })}
        </div>
    );
};

Events.propTypes = {
    classes: PropTypes.object.isRequired,
    zoomOnVenue: PropTypes.func.isRequired,
    selectEvent: PropTypes.func.isRequired,
    loading: PropTypes.array.isRequired,
    upcomingEvents: PropTypes.array.isRequired,
};

export default withStyles(styles)(Events);
