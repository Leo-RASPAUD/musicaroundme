import LoadingBar from 'react-redux-loading-bar';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import AppToolbar from 'components/AppToolbar/AppToolbar.container';
import SnackbarComponent from 'components/Snackbar/Snackbar.container';
import Router from 'components/Router/Router.container';

import styles from './App.styles';

@withStyles(styles)
class App extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <SnackbarComponent />
                <Fragment>
                    <AppBar position="static">
                        <AppToolbar />
                    </AppBar>
                    <LoadingBar className={classes.loadingBar} />
                    <Router />
                </Fragment>
            </div>
        );
    }
}

export default App;
