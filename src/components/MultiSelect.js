import React, {Component, createElement} from 'react';

const filter = Array.prototype.filter;

function contains(haystack, needle) {
  return haystack.toLowerCase().indexOf(needle) !== -1;
}

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      search: ''
    };
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

  onSearch({target}) {
    const search = target.value;
    let options = this.props.options;

    if (search !== '') {
      const searchLower = search.toLowerCase();
      options = options.filter(({key, value}) => {
        return contains(key, searchLower) || contains(value, searchLower);
      });
    }

    this.setState({options, search});
  }

  onChange({target}) {
    const selected = filter.call(target.options, (option) => option.selected);
    this.props.onChange(selected.map((option) => option.value));
  }
}

export default MultiSelect;
