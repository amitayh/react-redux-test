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
    const dateAsString = value ? dateFormat(value, 'isoDate') : null;
    const onChangeWithDate = (e) => {
      const stringValue = e.target.value;
      onChange(stringValue === '' ? null : new Date(stringValue));
    };

    return <input type="date" value={dateAsString} onChange={onChangeWithDate} />;
  }
}

DateWidget.defaultOperator = operators.EQUALS;
DateWidget.defaultValue = new Date();

export default DateWidget;
