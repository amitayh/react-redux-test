import {Map, List} from 'immutable';
import * as types from './actionTypes';
import * as fields from './fields';
import * as operators from './operators';

let nextId = 0;

const initialState = Map({
  selected: Map(),
  available: List([fields.name, fields.age, fields.dob, fields.married])
});

function getFilter(fieldName) {
  const field = fields[fieldName];
  const {defaultOperator, defaultValue} = field.widget;
  return Map({field, operator: defaultOperator, value: defaultValue});
}

const emptyFilter = getFilter('name');

function addFilter(state) {
  return state.update('selected', (selected) => {
    return selected.set(++nextId, emptyFilter);
  });
}

function removeFilter(state, filterId) {
  return state.deleteIn(['selected', filterId]);
}

function clearFilters(state) {
  return state.set('selected', Map());
}

function changeFilterField(state, filterId, fieldName) {
  return state.setIn(['selected', filterId], getFilter(fieldName));
}

function getValue(value, operator) {
  const isArray = Array.isArray(value);
  if (operator == operators.BETWEEN || operator == operators.NOT_BETWEEN) {
    return isArray ? value : [value, null];
  } else {
    return isArray ? value[0] : value;
  }
}

function changeFilterOperator(state, filterId, operator) {
  return state.updateIn(['selected', filterId], (filter) => {
    return filter
      .set('operator', operator)
      .set('value', getValue(filter.get('value'), operator));
  });
}

function changeFilterValue(state, filterId, value) {
  return state.setIn(['selected', filterId, 'value'], value);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_FILTER:
      return addFilter(state);

    case types.REMOVE_FILTER:
      return removeFilter(state, action.filterId);

    case types.CLEAR_FILTERS:
      return clearFilters(state);

    case types.CHANGE_FILTER_FIELD:
      return changeFilterField(state, action.filterId, action.fieldName);

    case types.CHANGE_FILTER_OPERATOR:
      return changeFilterOperator(state, action.filterId, action.operator);

    case types.CHANGE_FILTER_VALUE:
      return changeFilterValue(state, action.filterId, action.value);

    default:
      return state;
  }
}
