import React, {Component, createElement} from 'react';

class FilterItem extends Component {
  render() {
    return (
      <li>
        {this.renderAvailable()}
        {this.renderWidget()}
      </li>
    );
  }

  renderAvailable() {
    const {availableFields, onFieldChange, filter} = this.props;
    return (
      <select onChange={(e) => onFieldChange(e.target.value)} value={filter.get('field').name}>
        {availableFields.map(this.renderField.bind(this))}
      </select>
    );
  }

  renderField({name, displayName}) {
    return <option key={name} value={name}>{displayName}</option>;
  }

  renderWidget() {
    const field = this.props.filter.get('field');
    return createElement(field.widget);
  }
}

export default FilterItem;
