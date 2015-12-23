import React, {Component, createElement} from 'react';

class FilterItem extends Component {
  render() {
    return (
      <li>
        {this.renderAvailable()}
        {this.renderWidget()}
        <button onClick={this.props.onRemoveClick}>Remove</button>
      </li>
    );
  }

  renderAvailable() {
    const {availableFields, onFieldChange, filter} = this.props;
    return (
      <select value={filter.get('field').name} onChange={e => onFieldChange(e.target.value)}>
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
    return createElement(field.widget, {
      onOperatorChange: onOperatorChange,
      onValueChange: onValueChange,
      operator: filter.get('operator'),
      value: filter.get('value')
    });
  }
}

export default FilterItem;
