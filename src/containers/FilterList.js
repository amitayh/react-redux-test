import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import FilterItem from '../components/FilterItem';

class FilterList extends Component {
  render() {
    const {actions, filters} = this.props;
    return (
      <div>
        <h3>Filters</h3>
        {this.renderList()}
        <button onClick={actions.addFilter}>+ Add filter</button>{' | '}
        <button onClick={actions.clearFilters} disabled={filters.isEmpty()}>Clear all</button>
      </div>
    );
  }

  renderList() {
    const {filters} = this.props;

    if (filters.isEmpty()) {
      return null;
    }

    return (
      <ul className="filter-list">
        {filters.entrySeq().map(this.renderItem.bind(this))}
      </ul>
    );
  }

  renderItem([filterId, filter]) {
    const {actions, availableFields} = this.props;
    return <FilterItem
      key={filterId}
      availableFields={availableFields}
      onFieldChange={(fieldName) => actions.changeFilterField(filterId, fieldName)}
      onOperatorChange={(operator) => actions.changeFilterOperator(filterId, operator)}
      onValueChange={(value) => actions.changeFilterValue(filterId, value)}
      onRemoveClick={() => actions.removeFilter(filterId)}
      filter={filter} />;
  }
}

function mapStateToProps(state) {
  return {
    filters: state.get('filters'),
    availableFields: state.get('selectedFields')
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
