import React, {Component, createElement} from 'react';
import {is} from 'immutable';

class FilterItem extends Component {
  shouldComponentUpdate(nextProps) {
    const {filter, availableFields} = this.props;
    return !is(nextProps.filter, filter) ||
      !is(nextProps.availableFields, availableFields);
  }

  render() {
    return (
      <li className="filter-item">
        <button className="remove-button" onClick={this.props.onRemoveClick}>✖</button>
        {this.renderAvailable()}
        {this.renderWidget()}
      </li>
    );
  }

  renderAvailable() {
    const {availableFields, onFieldChange, filter} = this.props;
    return (
      <select value={filter.get('field').name} onChange={(e) => onFieldChange(e.target.value)}>
        {availableFields.map(this.renderField.bind(this))}
      </select>
    );
  }

  renderField({name, displayName}) {
    return <option key={name} value={name}>{displayName}</option>;
  }

  renderWidget() {
    const {filter, onOperatorChange, onValueChange} = this.props;
    const field = filter.get('field');
    const props = Object.assign({
      operator: filter.get('operator'),
      value: filter.get('value'),
      onOperatorChange,
      onValueChange
    }, field.widgetOptions);

    return createElement(field.widget, props);
  }
}

export default FilterItem;
