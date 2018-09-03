import LoadingBar from 'react-redux-loading-bar';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, CircularProgress } from '@material-ui/core';
import AppToolbar from 'components/AppToolbar/AppToolbar.component';
import Router from 'components/Router/Router.component';
import SnackbarComponent from 'components/Snackbar/Snackbar.container';
import styles from './MusicAroundMe.styles';

const MusicAroundMe = props => {
    const { classes, isLoadingConfiguration } = props;
    return (
        <Fragment>
            <SnackbarComponent />
            {isLoadingConfiguration && <CircularProgress color="secondary" size={50} />}
            {!isLoadingConfiguration && (
                <Fragment>
                    <AppBar position="static" className={classes.toolbar}>
                        <AppToolbar />
                    </AppBar>
                    <div className={classes.border} />
                    <LoadingBar className={classes.loadingBar} />
                    <Router />
                </Fragment>
            )}
        </Fragment>
    );
};

MusicAroundMe.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoadingConfiguration: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MusicAroundMe);
