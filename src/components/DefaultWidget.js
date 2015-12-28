import React, {Component} from 'react';
import * as operators from '../operators';
import {debounce} from '../functionUtils';

const ON_CHANGE_DELAY = 200;

class DefaultWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value};
    this.onValueChangeDebounced = debounce(props.onValueChange, ON_CHANGE_DELAY);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({value: nextProps.value});
    }
  }

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
      <select value={operator} onChange={(e) => onOperatorChange(e.target.value)}>
        {this.renderOperators()}
      </select>
    );
  }

  renderOperators() {
    const operators = this.getOperators();
    return Object.keys(operators).map((operator) => {
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
    return this.renderInputElement(this.state.value, this.onValueChange.bind(this));
  }

  renderDoubleInputs() {
    const [value1, value2] = this.state.value;
    return (
      <div>
        {this.renderInputElement(value1, (value) => this.onValueChange([value, value2]))}
        and
        {this.renderInputElement(value2, (value) => this.onValueChange([value1, value]))}
      </div>
    )
  }

  renderInputElement(value, onChange) {
    return <input value={value} onChange={(e) => onChange(e.target.value)} />;
  }

  onValueChange(value) {
    this.setState({value});
    this.onValueChangeDebounced(value);
  }
}

export default DefaultWidget;
