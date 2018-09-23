import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Select, FormControl, MenuItem, InputLabel, Grid, IconButton } from '@material-ui/core';
import { Search, MusicNoteOutlined, DateRangeOutlined, Clear } from '@material-ui/icons';
import datePickerUtils from 'utils/datePicker';
import styles from './SearchOptions.styles';

const { getMonths } = datePickerUtils;
const months = getMonths();

const SearchOptions = props => {
    const {
        classifications,
        loading,
        classes,
        selectedClassificationId,
        selectClassification,
        loadingEvents,
        selectedMonth,
        selectMonth,
        artist,
        updateArtist,
        search,
        clear,
    } = props;
    const isLoading = loading.length > 0 || loadingEvents.length > 0;
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.artist}>
                <div className={classes.searchArtist}>
                    <IconButton
                        disabled={isLoading}
                        className={classes.searchArtistIcon}
                        onClick={search}
                        disableRipple
                    >
                        <Search />
                    </IconButton>
                    <div style={{ borderRight: '1px solid #ddd', margin: '4px 0' }} />
                    <IconButton
                        disabled={isLoading}
                        className={classes.searchArtistIcon}
                        onClick={clear}
                        disableRipple
                    >
                        <Clear className={classes.searchArtistIcon} />
                    </IconButton>
                </div>

                <input
                    placeholder="Artist"
                    className={classes.artistTextField}
                    value={artist}
                    onChange={updateArtist}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.gridIcons}>
                <MusicNoteOutlined className={classes.white} />
                <FormControl className={classes.textField}>
                    <InputLabel htmlFor="classifications" className={classes.white}>
                        Genre
                    </InputLabel>
                    <Select
                        value={selectedClassificationId}
                        onChange={selectClassification}
                        inputProps={{
                            name: 'Genre',
                            id: 'classifications',
                        }}
                        disabled={isLoading}
                        classes={{ root: classes.white, icon: classes.white }}
                    >
                        <MenuItem key="All" value="All">
                            All
                        </MenuItem>
                        {classifications.map(classification => (
                            <MenuItem key={classification.name} value={classification.id}>
                                {classification.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.gridIcons}>
                <DateRangeOutlined className={classes.white} />
                <FormControl className={classes.textField}>
                    <InputLabel htmlFor="month" className={classes.white}>
                        Month
                    </InputLabel>
                    <Select
                        value={selectedMonth}
                        onChange={selectMonth}
                        inputProps={{
                            name: 'Genre',
                            id: 'month',
                        }}
                        disabled={isLoading}
                        classes={{ root: classes.white, icon: classes.white }}
                    >
                        <MenuItem key="All" value="All">
                            All
                        </MenuItem>
                        {months.map(month => (
                            <MenuItem key={month} value={month}>
                                {month}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

SearchOptions.propTypes = {
    classes: PropTypes.object.isRequired,
    classifications: PropTypes.array.isRequired,
    loadingEvents: PropTypes.array.isRequired,
    loading: PropTypes.array.isRequired,
    selectedClassificationId: PropTypes.string.isRequired,
    selectedMonth: PropTypes.string.isRequired,
    selectClassification: PropTypes.func.isRequired,
    selectMonth: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    artist: PropTypes.string.isRequired,
    updateArtist: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchOptions);
