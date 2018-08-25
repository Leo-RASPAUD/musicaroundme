import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Whatshot } from '@material-ui/icons';
import { Toolbar } from '@material-ui/core';

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
                <Whatshot className={classes.logoIcon} />
            </Toolbar>
        );
    }
}

export default AppToolbar;
