import {Map, OrderedMap, Set, is} from 'immutable';
import * as types from './actionTypes';
import * as fields from './fields';
import * as operators from './operators';

let nextId = 0;

const emptyFilters = OrderedMap();
const availableFields = Set([fields.name, fields.age, fields.dob, fields.married, fields.country]);

const initialState = Map({
  filters: emptyFilters,
  selectedFields: availableFields,
  availableFields
});

function selectField(state, field) {
  return state.update('selectedFields', (fields) => fields.add(field));
}

function unselectField(state, field) {
  const selectedFields = state.get('selectedFields');
  const filterWithRemovedField = (filter) => is(filter.get('field'), field);

  if (selectedFields.size === 1) {
    return state;
  }

  return state
    .update('filters', (filters) => filters.filterNot(filterWithRemovedField))
    .set('selectedFields', selectedFields.delete(field));
}

function getFilter(field) {
  const {defaultOperator, defaultValue} = field.widget;
  return Map({field, operator: defaultOperator, value: defaultValue});
}

function addFilter(state) {
  return state.update('filters', (filters) => {
    return filters.set(++nextId, getFilter(state.get('selectedFields').first()));
  });
}

function removeFilter(state, filterId) {
  return state.deleteIn(['filters', filterId]);
}

function clearFilters(state) {
  return state.set('filters', emptyFilters);
}

function changeFilterField(state, filterId, fieldName) {
  return state.setIn(['filters', filterId], getFilter(fields[fieldName]));
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
  return state.updateIn(['filters', filterId], (filter) => {
    return filter
      .set('operator', operator)
      .set('value', getValue(filter.get('value'), operator));
  });
}

function changeFilterValue(state, filterId, value) {
  return state.setIn(['filters', filterId, 'value'], value);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SELECT_FIELD:
      return selectField(state, action.field);

    case types.UNSELECT_FIELD:
      return unselectField(state, action.field);

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
