import React from 'react';
import DefaultWidget from './DefaultWidget';
import * as operators from '../operators';

class NumberWidget extends DefaultWidget {
  getOperators() {
    return {
      [operators.EQUALS]: '=',
      [operators.NOT_EQUALS]: '≠',
      [operators.GREATER_THAN]: '>',
      [operators.GREATER_THAN_EQUALS]: '≥',
      [operators.LESS_THAN]: '<',
      [operators.LESS_THAN_EQUALS]: '≤',
      [operators.BETWEEN]: 'between',
      [operators.NOT_BETWEEN]: 'not between'
    };
  }

  renderInputElement(value, onChange) {
    return <input type="number" value={value} onChange={e => onChange(parseInt(e.target.value))} />;
  }
}

NumberWidget.defaultOperator = operators.EQUALS;
NumberWidget.defaultValue = 0;

export default NumberWidget;
