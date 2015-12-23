import React, {Component} from 'react';

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
    return {};
  }

  renderInputs() {
    return <input value={this.props.value} />;
  }


}

export default DefaultWidget;
