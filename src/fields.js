import StringWidget from './components/StringWidget';
import NumberWidget from './components/NumberWidget';
import DateWidget from './components/DateWidget';
import BooleanWidget from './components/BooleanWidget';

export const name = {name: 'name', displayName: 'Name', widget: StringWidget};
export const age = {name: 'age', displayName: 'Age', widget: NumberWidget};
export const dob = {name: 'dob', displayName: 'Date of birth', widget: DateWidget};
export const married = {name: 'married', displayName: 'Married', widget: BooleanWidget};
