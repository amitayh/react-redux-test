import React, {Component, createElement} from 'react';
import {debounce} from '../functionUtils';

const SEARCH_DELAY = 200;

function contains(haystack, needle) {
  return haystack.toLowerCase().indexOf(needle) !== -1;
}

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {options: props.options, search: ''};
    this.doSearchDebounced = debounce(this.doSearch, SEARCH_DELAY);
  }

  render() {
    return (
      <div className="multi-select">
        <input
          type="search"
          placeholder="Search..."
          value={this.state.search}
          onChange={this.onSearch.bind(this)} />

        <select multiple value={this.props.value} onChange={this.onChange.bind(this)}>
          {this.renderOptions()}
        </select>

        <button onClick={this.selectAll.bind(this)}>All</button>
        <button onClick={this.selectNone.bind(this)}>None</button>
      </div>
    );
  }

  renderOptions() {
    return this.state.options.map(({key, value}) => {
      return <option key={key} value={key}>{value}</option>;
    });
  }

  selectAll() {
    const {options} = this.state;
    this.props.onChange(options.map((option) => option.key));
  }

  selectNone() {
    this.props.onChange([]);
  }

  doSearch(search) {
    let options = this.props.options;

    if (search !== '') {
      const searchLower = search.toLowerCase();
      options = options.filter(({key, value}) => {
        return contains(key, searchLower) || contains(value, searchLower);
      });
    }

    this.setState({options});
  }

  onSearch({target}) {
    const search = target.value;
    this.doSearchDebounced(search);
    this.setState({search});
  }

  onChange({target}) {
    const selected = Array.prototype.filter.call(target.options, (option) => option.selected);
    this.props.onChange(selected.map((option) => option.value));
  }
}

export default MultiSelect;
