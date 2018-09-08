import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import styles from './SearchOptions.styles';

const SearchOptions = props => {
    const {
        classifications,
        loading,
        classes,
        selectedClassificationId,
        selectClassification,
    } = props;
    const isLoading = loading.length > 0;
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
                        <MenuItem key={classification.id} value={classification.id}>
                            {classification.name}
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
    loading: PropTypes.array.isRequired,
    selectedClassificationId: PropTypes.string.isRequired,
    selectClassification: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchOptions);
