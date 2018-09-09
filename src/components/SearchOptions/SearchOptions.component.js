import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    TextField,
    Button,
    Grid,
} from '@material-ui/core';
import {
    Search,
    AccountCircleOutlined,
    MusicNoteOutlined,
    DateRangeOutlined,
} from '@material-ui/icons';
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
    } = props;
    const isLoading = loading.length > 0 || loadingEvents.length > 0;
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={12} md={6}>
                <MusicNoteOutlined color="primary" />
                <FormControl className={classes.textField}>
                    <InputLabel htmlFor="classifications">Genre</InputLabel>
                    <Select
                        value={selectedClassificationId}
                        onChange={selectClassification}
                        inputProps={{
                            name: 'Genre',
                            id: 'classifications',
                        }}
                        disabled={isLoading}
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
            <Grid item xs={12} sm={12} md={6}>
                <DateRangeOutlined color="primary" />
                <FormControl className={classes.textField}>
                    <InputLabel htmlFor="month">Month</InputLabel>
                    <Select
                        value={selectedMonth}
                        onChange={selectMonth}
                        inputProps={{
                            name: 'Genre',
                            id: 'month',
                        }}
                        disabled={isLoading}
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
            <Grid item xs={12} sm={12} md={6}>
                <AccountCircleOutlined color="primary" />
                <TextField
                    id="artist"
                    label="Artist"
                    disabled={isLoading}
                    className={classes.textField}
                    value={artist}
                    onChange={updateArtist}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={12} className={classes.search}>
                <Button variant="outlined" color="primary" onClick={search} disabled={isLoading}>
                    <Search />
                    Search
                </Button>
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
};

export default withStyles(styles)(SearchOptions);
