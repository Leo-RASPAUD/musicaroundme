import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
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
    } = props;
    const isLoading = loading.length > 0 || loadingEvents.length > 0;
    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
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
            <FormControl className={classes.formControl}>
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
                    {months.map(month => (
                        <MenuItem key={month} value={month}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
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
};

export default withStyles(styles)(SearchOptions);
