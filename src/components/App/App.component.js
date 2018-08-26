import LoadingBar from 'react-redux-loading-bar';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, CircularProgress } from '@material-ui/core';
import AppToolbar from 'components/AppToolbar/AppToolbar.container';
import SnackbarComponent from 'components/Snackbar/Snackbar.container';
import Router from 'components/Router/Router.container';

import styles from './App.styles';

@withStyles(styles)
class App extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isLoadingConfiguration: PropTypes.bool.isRequired,
        getConfiguration: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        const { getConfiguration } = this.props;
        getConfiguration();
    }

    render() {
        const { classes, isLoadingConfiguration } = this.props;

        return (
            <div className={classes.root}>
                <SnackbarComponent />
                {isLoadingConfiguration && (
                    <div className={classes.progressWrapper}>
                        <CircularProgress
                            className={classes.progress}
                            color="secondary"
                            size={50}
                        />
                    </div>
                )}
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
            </div>
        );
    }
}

export default App;
