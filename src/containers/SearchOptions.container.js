import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import SearchOptions from 'components/SearchOptions/SearchOptions.component';
import actions from 'actions/SearchOptions.actions';
import eventActions from 'actions/Events.actions';

const mapStateToProps = state => ({
    loading: state.searchOptions.loading,
    loadingEvents: state.events.loading,
    classifications: state.searchOptions.classifications,
    selectedClassificationId: state.searchOptions.selectedClassificationId,
    selectedMonth: state.searchOptions.selectedMonth,
    artist: state.searchOptions.artist,
});

const mapDispatchToProps = dispatch => ({
    getClassifications: () => dispatch(actions.getClassifications()),
    updateArtist: event => dispatch(actions.updateArtist({ artist: event.target.value })),
    selectClassification: event => {
        dispatch(actions.selectClassification({ classificationId: event.target.value }));
    },
    selectMonth: event => {
        dispatch(actions.selectMonth({ selectedMonth: event.target.value }));
    },
    search: () => {
        dispatch(eventActions.getEvents({}));
    },
});

@withRouter
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class SearchOptionsContainer extends React.PureComponent {
    static propTypes = {
        getClassifications: PropTypes.func.isRequired,
        loading: PropTypes.array.isRequired,
        loadingEvents: PropTypes.array.isRequired,
        classifications: PropTypes.array.isRequired,
        selectedClassificationId: PropTypes.string.isRequired,
        selectedMonth: PropTypes.string.isRequired,
        selectClassification: PropTypes.func.isRequired,
        selectMonth: PropTypes.func.isRequired,
        updateArtist: PropTypes.func.isRequired,
        search: PropTypes.func.isRequired,
        artist: PropTypes.string.isRequired,
    };

    componentDidMount = () => {
        const { getClassifications } = this.props;
        getClassifications();
    };

    render() {
        const {
            loading,
            loadingEvents,
            classifications,
            selectedClassificationId,
            selectedMonth,
            selectClassification,
            selectMonth,
            artist,
            updateArtist,
            search,
        } = this.props;
        return (
            <SearchOptions
                loading={loading}
                loadingEvents={loadingEvents}
                classifications={classifications}
                selectedClassificationId={selectedClassificationId}
                selectClassification={selectClassification}
                selectedMonth={selectedMonth}
                selectMonth={selectMonth}
                artist={artist}
                search={search}
                updateArtist={updateArtist}
            />
        );
    }
}

export default SearchOptionsContainer;
