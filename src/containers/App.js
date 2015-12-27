import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FieldsSelector from './../components/FieldsSelector';
import FilterList from './FilterList';
import * as actionCreators from '../actionCreators';

class App extends Component {
  render() {
    const {selectedFields, availableFields, actions} = this.props;
    return (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Architecto atque aut laborum non quo recusandae voluptatum?
          Accusantium adipisci assumenda iure maxime nulla numquam officiis provident, quos,
          saepe sapiente sint voluptatum?
        </p>

        <FieldsSelector
          available={availableFields}
          selected={selectedFields}
          onSelect={actions.selectField}
          onUnselect={actions.unselectField} />

        <FilterList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedFields: state.get('selectedFields'),
    availableFields: state.get('availableFields')
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
