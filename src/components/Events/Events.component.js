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
import { Home } from '@material-ui/icons';
import { Facebook } from 'react-content-loader';
import moment from 'moment';
import { FaTicketAlt, FaWikipediaW, FaYoutube, FaFacebookF } from 'react-icons/fa';
import utils from 'utils/event.utils';
import styles from './Events.styles';

const { formatEvents } = utils;

@withStyles(styles)
class Events extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        zoomOnVenue: PropTypes.func.isRequired,
        loading: PropTypes.array.isRequired,
        upcomingEvents: PropTypes.array.isRequired,
    };

    constructor() {
        super();
        this.state = {
            expanded: null,
        };
    }

    handleChange = panel => (_, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { expanded } = this.state;
        const { classes, upcomingEvents, loading, zoomOnVenue } = this.props;
        const events = formatEvents(upcomingEvents);
        return (
            <div className={classes.root}>
                {loading.length > 0 && <Facebook />}
                {loading.length === 0 && upcomingEvents.length === 0 && <div>No events</div>}
                {loading.length === 0 &&
                    events.length > 0 &&
                    events.map(event => {
                        const genreName = event.classifications[0].genre.name;
                        const genre = genreName === 'Undefined' ? 'Other' : genreName;
                        const { attractions } = event._embedded;
                        let links;
                        if (attractions) {
                            links = event._embedded.attractions[0].externalLinks;
                        }

                        return (
                            <ExpansionPanel
                                key={event.id}
                                onClick={() =>
                                    zoomOnVenue({
                                        position: { lat: event.lat, lng: event.lng },
                                        zoom: 16,
                                        venueId: event._embedded.venues[0].id,
                                    })
                                }
                                className={classes.panel}
                                expanded={expanded === `panel_${event.id}`}
                                onChange={this.handleChange(`panel_${event.id}`)}
                            >
                                <ExpansionPanelSummary
                                    className={classes.avatar}
                                    classes={{ root: classes.panelRoot }}
                                >
                                    <Avatar
                                        alt={event.name}
                                        src={event.images[0].url}
                                        className={classes.avatar}
                                    />
                                    <div className={classes.avatarDetails}>
                                        <Typography variant="subheading">{event.name}</Typography>
                                        <Typography variant="caption">
                                            {moment(event.dates.start.dateTime).format(
                                                'Do MMMM YYYY, HH:mm',
                                            )}
                                        </Typography>
                                        <Typography variant="caption">
                                            {event._embedded.venues[0].name}
                                        </Typography>
                                    </div>
                                    {
                                        <Chip
                                            className={classes.chip}
                                            label={genre || 'Other'}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    }
                                </ExpansionPanelSummary>
                                {event.selected && (
                                    <ExpansionPanelDetails>
                                        <Tooltip title="Homepage">
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!links || !links.homepage}
                                                onClick={() => window.open(links.homepage[0].url)}
                                            >
                                                <Home className={classes.linkIcon} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Buy tickets">
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!links}
                                                onClick={() => window.open(event.url)}
                                            >
                                                <FaTicketAlt className={classes.linkIcon} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Facebook">
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!links || !links.facebook}
                                                onClick={() => window.open(links.facebook[0].url)}
                                            >
                                                <FaFacebookF className={classes.linkIcon} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Youtube">
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!links || !links.youtube}
                                                onClick={() => window.open(links.youtube[0].url)}
                                            >
                                                <FaYoutube className={classes.linkIcon} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Wikipedia">
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                disabled={!links || !links.wiki}
                                                onClick={() => window.open(links.wiki[0].url)}
                                            >
                                                <FaWikipediaW className={classes.linkIcon} />
                                            </IconButton>
                                        </Tooltip>
                                    </ExpansionPanelDetails>
                                )}
                            </ExpansionPanel>
                        );
                    })}
            </div>
        );
    }
}

export default Events;
