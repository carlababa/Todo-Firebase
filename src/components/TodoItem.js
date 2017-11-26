import React, { Component } from 'react';
import TimePicker from 'material-ui/TimePicker';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import TimeToEnd from './TimeToEnd';

const TimePickerStyled = styled(TimePicker)`
  margin-left: 60px;
`;

const StyledInput = styled.input`
  margin-top: 15px;
`;

const StyledContainer = styled.div`
  border-bottom: 1px solid #e8e7e7;
`;

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  }

  handleSave = (todo, attr) => {
    if (attr.text === '') {
      this.props.deleteTodo(todo.id);
    } else {
      this.props.editTodo(todo, attr);
    }
    this.setState({ editing: false });
  }

  completeTodo = (todo) => {
    this.props.editTodo(todo, {
      completed: !todo.completed,
    });
  }

  playSound = () => {
    const audio = new Audio('oh_o_gas.wav');
    audio.play();
  }

  render() {
    const { todo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={text => this.handleSave(todo, { text })}
        />
      );
    } else {
      element = (
        <div className="view">
          <StyledInput className="toggle" id={`todo_${todo.id}`} type="checkbox" checked={todo.completed} onChange={() => this.completeTodo(todo)} />
          <label htmlFor={`todo_${todo.id}`} onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" style={{ marginTop: '5px' }} onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <StyledContainer>
        <li className={classnames({ completed: todo.completed, editing: this.state.editing })}>
          {element}
          <TimePickerStyled
            hintText="Due Time"
            mode="landscape"
            value={todo.dueTime}
            onChange={(x, dueTime) => this.handleSave(todo, { dueTime })}
          />
          {todo.dueTime &&
            <TimeToEnd dueTime={todo.dueTime} onPassedNow={this.playSound} />
          }
        </li>
      </StyledContainer>
    );
  }
}
