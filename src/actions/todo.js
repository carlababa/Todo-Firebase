import * as types from '../constants/ActionTypes';
import * as firebase from '../firebase';

const addTodoSuccess = todo => ({ type: types.ADD_TODO, todo });
const getTodosSuccess = todos => ({ type: types.GET_TODOS, todos });
const updateTodos = todos => ({ type: types.UPDATE_TODOS, todos });
const deleteTodoSuccess = id => ({ type: types.DELETE_TODO, id });
const editTodoAction = (id, todo) => ({ type: types.EDIT_TODO, id, todo });
const completedAllAction = completed => ({ type: types.COMPLETE_ALL, completed });
const clearCompletedSuccess = () => ({ type: types.CLEAR_COMPLETED });

export const addTodo = text => (
  (dispatch) => {
    const todo = {
      text,
      date: null,
      completed: false,
    };
    const userId = firebase.auth.currentUser.uid;
    return firebase.todos(userId).push(todo)
      .then(response => dispatch(addTodoSuccess({ ...todo, id: response.key })));
  }
);

export const getTodos = () => (
  (dispatch) => {
    const userId = firebase.auth.currentUser.uid;
    return firebase.todos(userId).orderByChild('priority').once('value', (snap) => {
      const todos = [];
      snap.forEach((item) => {
        const todo = item.val();
        const dueTime = todo.dueTime ? new Date(todo.dueTime) : null;
        todos.push({ ...todo, id: item.key, dueTime });
      });

      if (todos) {
        dispatch(getTodosSuccess(todos));
      }
    });
  }
);

export const editTodo = (todo, attr) => (
  (dispatch) => {
    dispatch(editTodoAction(todo.id, attr));
    const userId = firebase.auth.currentUser.uid;
    return firebase.todos(userId).child(todo.id).update(attr)
      .catch(() => dispatch(editTodoAction(todo.id, todo)));
  }
);

export const deleteTodo = id => (dispatch) => {
  const userId = firebase.auth.currentUser.uid;
  return firebase.todos(userId).child(id).remove()
    .then(() => dispatch(deleteTodoSuccess(id)));
};

export const completeAll = () => (
  (dispatch, getState) => {
    const { todos } = getState();
    const completed = !getState().todos.every(todo => todo.completed);
    const toUpdate = {};
    todos.forEach((todo) => {
      toUpdate[todo.id] = { ...todo, completed };
    });
    const userId = firebase.auth.currentUser.uid;
    return firebase.todos(userId).update(toUpdate)
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
    const userId = firebase.auth.currentUser.uid;
    return firebase.todos(userId).update(toUpdate)
      .then(() => dispatch(clearCompletedSuccess()));
  }
);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderTodos = (from, to) => (
  (dispatch, getState) => {
    const { todos } = getState();
    const userId = firebase.auth.currentUser.uid;
    const reorderedTodos = reorder(todos, from, to);

    const toUpdate = {};
    reorderedTodos.forEach((todo, i) => {
      toUpdate[todo.id] = { ...todo, priority: i };
    });

    dispatch(updateTodos(reorderedTodos));
    return firebase.todos(userId).update(toUpdate)
      .catch(() => dispatch(updateTodos(todos)));
  }
);
