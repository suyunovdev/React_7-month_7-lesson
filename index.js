const { createStore } = require("redux");

// Actions
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const UPDATE_TODO = "UPDATE_TODO";

const addTodo = task => ({ type: ADD_TODO, payload: task });
const removeTodo = id => ({ type: REMOVE_TODO, payload: id });
const updateTodo = (id, newTask) => ({
  type: UPDATE_TODO,
  payload: { id, newTask },
});

// Reducer
let nextId = 1;

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: nextId++, task: action.payload }];
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    case UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, task: action.payload.newTask }
          : todo
      );
    default:
      return state;
  }
};

// Store
const store = createStore(todoReducer);

const displayTodos = () => {
  console.log("Current Todos:", store.getState());
};

store.subscribe(displayTodos);

// Dispatching actions
store.dispatch(addTodo("Learn Redux"));
store.dispatch(addTodo("Learn React"));
store.dispatch(updateTodo(1, "Master Redux"));
store.dispatch(removeTodo(2));
