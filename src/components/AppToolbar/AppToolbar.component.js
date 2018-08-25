import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MusicNote } from '@material-ui/icons';
import { Toolbar, Typography } from '@material-ui/core';

import styles from './AppToolbar.styles';

@withStyles(styles)
class AppToolbar extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;

        return (
            <Toolbar>
                <MusicNote className={classes.logoIcon} />
                <Typography className={classes.logoText} variant="headline">
                    MusicAroundMe
                </Typography>
            </Toolbar>
        );
    }
}

export default AppToolbar;
