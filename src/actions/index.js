import * as types from '../constants/ActionTypes';
import * as firebase from '../firebase';

const addTodoSuccess = todo => ({ type: types.ADD_TODO, todo });
const getTodosSuccess = todos => ({ type: types.GET_TODOS, todos });
const deleteTodoSuccess = id => ({ type: types.DELETE_TODO, id });
export const editTodoAction = (id, todo) => ({ type: types.EDIT_TODO, id, todo });
export const completedAllAction = completed => ({ type: types.COMPLETE_ALL, completed });
export const clearCompletedSuccess = () => ({ type: types.CLEAR_COMPLETED });


export const addTodo = (text, dueDate) => (
  (dispatch) => {
    const todo = {
      text,
      dueDate: dueDate || null,
      completed: false,
    };

    firebase.todos.push(todo)
      .then(response => dispatch(addTodoSuccess({ ...todo, id: response.key })));
  }
);

export const getTodos = () => (
  dispatch => (
    firebase.todos.once('value', (snap) => {
      const todos = snap.val();
      if (todos) {
        dispatch(getTodosSuccess(todos));
      }
    })
  )
);

export const editTodo = (todo, attr) => (
  (dispatch) => {
    dispatch(editTodoAction(todo.id, attr));
    return firebase.todos.child(todo.id).update(attr)
      .catch(() => dispatch(editTodoAction(todo.id, todo)));
  }
);

export const deleteTodo = id => (
  dispatch => firebase.todos.child(id).remove()
    .then(() => dispatch(deleteTodoSuccess(id)))
);

export const completeAll = () => (
  (dispatch, getState) => {
    const { todos } = getState();
    const completed = !getState().todos.every(todo => todo.completed);
    const toUpdate = {};
    todos.forEach((todo) => {
      toUpdate[todo.id] = { ...todo, completed };
    });
    return firebase.todos.update(toUpdate)
      .then(() => dispatch(completedAllAction(completed)));
  }
);

export const clearCompleted = () => (
  (dispatch, getState) => {
    const completedTodos = getState().todos.filter(todo => todo.completed);
    const toUpdate = {};
    completedTodos.forEach((todo) => {
      toUpdate[todo.id] = null;
    });
    return firebase.todos.update(toUpdate)
      .then(() => dispatch(clearCompletedSuccess()));
  }
);
