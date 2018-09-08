import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import map from './map.reducer';
import app from './app.reducer';
import events from './events.reducer';
import venues from './venues.reducer';

const mainReducer = combineReducers({
    loadingBar: loadingBarReducer,
    router: routerReducer,
    map,
    app,
    venues,
    events,
});

export default mainReducer;
