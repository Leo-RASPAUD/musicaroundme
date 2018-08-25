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
        isLoadingLocalisation: PropTypes.bool.isRequired,
        getConfiguration: PropTypes.func.isRequired,
        getLocalisation: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        const { getConfiguration } = this.props;
        getConfiguration();
    };

    componentDidUpdate = () => {
        const { getLocalisation, isLoadingConfiguration, isLoadingLocalisation } = this.props;
        if (!isLoadingConfiguration && isLoadingLocalisation) {
            getLocalisation();
        }
    };

    render() {
        const { classes, isLoadingLocalisation, isLoadingConfiguration } = this.props;
        const isAppInitializing = isLoadingLocalisation || isLoadingConfiguration;

        return (
            <div className={classes.root}>
                <SnackbarComponent />
                {isAppInitializing && (
                    <div className={classes.progressWrapper}>
                        <CircularProgress
                            className={classes.progress}
                            color="secondary"
                            size={50}
                        />
                    </div>
                )}
                {!isAppInitializing && (
                    <Fragment>
                        <AppBar position="static" style={{ backgroundColor: 'white' }}>
                            <AppToolbar />
                        </AppBar>
                        <LoadingBar className={classes.loadingBar} />
                        <Router />
                    </Fragment>
                )}
            </div>
        );
    }
}

export default App;
