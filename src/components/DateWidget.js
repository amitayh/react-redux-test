import DefaultWidget from './DefaultWidget';
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
}

DateWidget.defaultOperator = operators.EQUALS;
DateWidget.defaultValue = new Date();

export default DateWidget;
