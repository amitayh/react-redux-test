import {Map, List} from 'immutable';
import * as types from './actionTypes';
import * as fields from './fields';
import * as operators from './operators';

let nextId = 0;

const initialState = Map({
  selected: Map(),
  available: List([fields.name, fields.age, fields.dob, fields.married])
});

const emptyFilter = Map({field: fields.name, operator: operators.EQUALS, value: null});

function addFilter(state) {
  return state.update('selected', selected => {
    return selected.set(++nextId, emptyFilter);
  });
}

function clearFilters(state) {
  return state.set('selected', Map());
}

function changeFilterField(state, filterId, fieldName) {
  return state.setIn(['selected', filterId, 'field'], fields[fieldName]);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_FILTER:
      return addFilter(state);

    case types.CLEAR_FILTERS:
      return clearFilters(state);

    case types.CHANGE_FILTER_FIELD:
      return changeFilterField(state, action.filterId, action.fieldName);

    default:
      return state;
  }
}
