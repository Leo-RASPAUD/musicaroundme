import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import SearchOptions from 'components/SearchOptions/SearchOptions.component';
import actions from 'actions/SearchOptions.actions';
import eventActions from 'actions/Events.actions';

const mapStateToProps = state => ({
    loading: state.searchOptions.loading,
    classifications: state.searchOptions.classifications,
    selectedClassificationId: state.searchOptions.selectedClassificationId,
});

const mapDispatchToProps = dispatch => ({
    getClassifications: () => dispatch(actions.getClassifications()),
    selectClassification: event => {
        dispatch(
            eventActions.getEvents({
                classificationId: event.target.value === 'All' ? '' : event.target.value,
            }),
        );
        dispatch(actions.selectClassification({ classificationId: event.target.value }));
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
        classifications: PropTypes.array.isRequired,
        selectedClassificationId: PropTypes.string.isRequired,
        selectClassification: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        const { getClassifications } = this.props;
        getClassifications();
    };

    render() {
        const {
            loading,
            classifications,
            selectedClassificationId,
            selectClassification,
        } = this.props;
        return (
            <SearchOptions
                loading={loading}
                classifications={classifications}
                selectedClassificationId={selectedClassificationId}
                selectClassification={selectClassification}
            />
        );
    }
}

export default SearchOptionsContainer;
