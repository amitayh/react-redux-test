import React from 'react';
import DefaultWidget from './DefaultWidget';
import MultiSelect from './MultiSelect';
import * as operators from '../operators';

class SelectWidget extends DefaultWidget {
  getOperators() {
    return {
      [operators.EQUALS]: 'is',
      [operators.NOT_EQUALS]: 'is not'
    };
  }

  renderInputs() {
    const {value, options, onValueChange} = this.props;
    return <MultiSelect value={value} options={options} onChange={onValueChange} />;
  }
}

SelectWidget.defaultOperator = operators.EQUALS;
SelectWidget.defaultValue = [];

export default SelectWidget;
