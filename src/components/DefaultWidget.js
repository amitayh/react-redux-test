import React, {Component} from 'react';
import * as operators from '../operators';

class DefaultWidget extends Component {
  render() {
    return (
      <div>
        {this.renderOperatorSelector()}
        {this.renderInputs()}
      </div>
    );
  }

  renderOperatorSelector() {
    const {operator, onOperatorChange} = this.props;
    return (
      <select value={operator} onChange={e => onOperatorChange(e.target.value)}>
        {this.renderOperators()}
      </select>
    );
  }

  renderOperators() {
    const operators = this.getOperators();
    return Object.keys(operators).map(operator => {
      return <option key={operator} value={operator}>{operators[operator]}</option>;
    });
  }

  getOperators() {
    // Should be overridden by subclasses
    return {};
  }

  renderInputs() {
    switch (this.props.operator) {
      case operators.BETWEEN:
      case operators.NOT_BETWEEN:
        return this.renderDoubleInputs();

      default:
        return this.renderSingleInput();
    }
  }

  renderSingleInput() {
    const {value, onValueChange} = this.props;
    return this.renderInputElement(value, onValueChange);
  }

  renderDoubleInputs() {
    const {value, onValueChange} = this.props;
    const [value1, value2] = value;
    return (
      <div>
        {this.renderInputElement(value1, v => onValueChange([v, value2]))}
        and
        {this.renderInputElement(value2, v => onValueChange([value1, v]))}
      </div>
    )
  }

  renderInputElement(value, onChange) {
    return <input value={value} onChange={e => onChange(e.target.value)} />;
  }
}

export default DefaultWidget;
