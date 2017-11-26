import { ADD_TODO, GET_TODOS, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes';

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        action.todo,
      ];

    case GET_TODOS: {
      const todoList = Object.keys(action.todos).map(id => ({ id, ...action.todos[id] }));
      return [
        ...state,
        ...todoList,
      ];
    }

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case EDIT_TODO:
      return state.map(todo => (todo.id === action.id
        ? { ...todo, ...action.todo }
        : todo
      ));

    case COMPLETE_TODO:
      return state.map(todo => (todo.id === action.id
        ? { ...todo, completed: !todo.completed }
        : todo
      ));

    case COMPLETE_ALL:
      return state.map(todo => ({
        ...todo,
        completed: action.completed,
      }));

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
}
