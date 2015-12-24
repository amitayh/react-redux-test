import React from 'react';
import DefaultWidget from './DefaultWidget';
import dateFormat from 'dateformat';
import * as operators from '../operators';

class DateWidget extends DefaultWidget {
  getOperators() {
    return {
      [operators.EQUALS]: 'on',
      [operators.GREATER_THAN]: 'after',
      [operators.LESS_THAN]: 'before',
      [operators.BETWEEN]: 'between',
      [operators.NOT_BETWEEN]: 'not between'
    };
  }

  renderInputElement(value, onChange) {
    const valueFormatted = value ? dateFormat(value, 'yyyy-mm-dd') : '';
    const onChangeFormatted = e => onChange(new Date(e.target.value));

    return <input type="date" value={valueFormatted} onChange={onChangeFormatted} />;
  }
}

DateWidget.defaultOperator = operators.EQUALS;
DateWidget.defaultValue = new Date();

export default DateWidget;
