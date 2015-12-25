import React, {Component} from 'react';
import * as operators from '../operators';

class BooleanWidget extends Component {
  render() {
    const {value, onValueChange} = this.props;
    return (
      <label>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onValueChange(e.target.checked)} />
        True
      </label>
    );
  }
}

BooleanWidget.defaultOperator = operators.EQUALS;
BooleanWidget.defaultValue = false;

export default BooleanWidget;
