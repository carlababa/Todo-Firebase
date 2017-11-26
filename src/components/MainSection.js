import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed,
};

const getItemStyle = (draggableStyle, isDragging) => ({
  // change background colour if dragging
  background: isDragging ? '#fff2c7' : undefined,

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = { filter: SHOW_ALL }

  componentDidMount() {
    this.props.actions.getTodos();
  }

  onDragEnd = (results) => {
    const { actions } = this.props;
    if (results.destination && results.destination.index !== results.source.index) {
      actions.reorderTodos(results.source.index, results.destination.index);
    }
  }

  handleShow = (filter) => {
    this.setState({ filter });
  }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted();
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todos.length}
            readOnly
          />
          <label onClick={actions.completeAll} />
        </span>
      );
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce(
      (count, todo) =>
        (todo.completed ? count + 1 : count),
      0,
    );

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <ul className="todo-list" ref={provided.innerRef}>
                {filteredTodos.map(todo => (
                  <Draggable key={todo.id} draggableId={todo.id}>
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem key={todo.id} todo={todo} {...actions} />
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                  ))}
              </ul>
              )}
          </Droppable>
        </DragDropContext>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}
