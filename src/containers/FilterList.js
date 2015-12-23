import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import FilterItem from '../components/FilterItem';

class FilterList extends Component {
  render() {
    const {actions, selected} = this.props;
    return (
      <div>
        {this.renderList()}
        <button onClick={actions.addFilter}>+ Add filter</button>{' | '}
        <button onClick={actions.clearFilters} disabled={selected.isEmpty()}>Clear all</button>
      </div>
    );
  }

  renderList() {
    const {selected} = this.props;

    if (selected.isEmpty()) {
      return null;
    }

    return <ul>{selected.entrySeq().map(this.renderItem.bind(this))}</ul>;
  }

  renderItem([filterId, filter]) {
    const {actions, available} = this.props;
    return <FilterItem
      key={filterId}
      availableFields={available}
      onFieldChange={(fieldName) => actions.changeFilterField(filterId, fieldName)}
      filter={filter} />;
  }
}

function mapStateToProps(state) {
  return {
    selected: state.get('selected'),
    available: state.get('available')
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
