import React, {Component} from 'react';

class FieldsSelector extends Component {
  render() {
    const {available} = this.props;
    return (
      <div>
        <h3>Fields</h3>
        <ul>{available.map(this.renderField.bind(this))}</ul>
      </div>
    );
  }

  renderField(field) {
    const {name, displayName} = field;
    const {selected, onSelect, onUnselect} = this.props;
    const checked = selected.contains(field);
    const onChange = (e) => {
      if (e.target.checked) {
        onSelect(field);
      } else {
        onUnselect(field);
      }
    };

    return (
      <li key={name}>
        <label>
          <input type="checkbox" checked={checked} onChange={onChange} />
          {displayName}
        </label>
      </li>
    );
  }
}

export default FieldsSelector;
