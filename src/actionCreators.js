import * as types from './actionTypes';

export function selectField(field) {
  return {type: types.SELECT_FIELD, field};
}

export function unselectField(field) {
  return {type: types.UNSELECT_FIELD, field};
}

export function addFilter() {
  return {type: types.ADD_FILTER};
}

export function removeFilter(filterId) {
  return {type: types.REMOVE_FILTER, filterId};
}

export function clearFilters() {
  return {type: types.CLEAR_FILTERS};
}

export function changeFilterField(filterId, fieldName) {
  return {type: types.CHANGE_FILTER_FIELD, filterId, fieldName};
}

export function changeFilterOperator(filterId, operator) {
  return {type: types.CHANGE_FILTER_OPERATOR, filterId, operator};
}

export function changeFilterValue(filterId, value) {
  return {type: types.CHANGE_FILTER_VALUE, filterId, value};
}
