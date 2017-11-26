import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

const App = ({ todos, actions }) => (
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
);

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default App;
